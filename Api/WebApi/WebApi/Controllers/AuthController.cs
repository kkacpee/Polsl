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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
        [AllowAnonymous]
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
