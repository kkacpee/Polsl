using Core.DTO.Requests;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMessages(CancellationToken cancellationToken)
        {
            var result = await _messageService.GetAllMessagesAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> AddMessage([FromBody] AddMessageRequest request, CancellationToken cancellationToken)
        {
            var result = await _messageService.AddMessageAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("delete/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMessage(int id, CancellationToken cancellationToken)
        {
            await _messageService.DeleteMessagePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
