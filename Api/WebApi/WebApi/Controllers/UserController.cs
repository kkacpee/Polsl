using Core.DTO.Requests;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Persistence.Models;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserManager<User> _userManager;

        public UserController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(AddUserRequest addUserRequest, CancellationToken cancellationToken)
        {
            var user = new User();
            user.UserName = addUserRequest.Email;
            user.Email = addUserRequest.Email;
            var result = await _userManager.CreateAsync(user, addUserRequest.Password);

            return NoContent();
        }
    }
}
