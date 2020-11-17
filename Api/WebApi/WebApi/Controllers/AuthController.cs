using Core.DTO.Requests;
using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Core.Helpers;
using Persistence.Models;

namespace WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration, UserManager<User> userManager,
            SignInManager<User> signInManager, IDateTimeProvider dateTimeProvider)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dateTimeProvider = dateTimeProvider;
            _configuration = configuration;
        }

        [HttpPost("Login")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> LoginAsync(LoginRequest loginRequest, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);
            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);
                if (result.Succeeded)
                {
                    var token = TokenHelper.GenerateJWT(user.Email, _dateTimeProvider, _configuration);

                    return Ok(token);
                }
            }
            return Unauthorized();
        }
    }
}
