using Core.DTO.Requests;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class EmergencyNumberController : ControllerBase
    {
        private readonly IEmergencyNumberService _emergencyNumberService;

        public EmergencyNumberController(IEmergencyNumberService emergencyNumberService)
        {
            _emergencyNumberService = emergencyNumberService;
        }

        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEmergencyNumbers(CancellationToken cancellationToken)
        {
            var result = await _emergencyNumberService.GetAllEmergencyNumbers(cancellationToken);

            return Ok(result);
        }

        [HttpGet("get/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEmergencyNumbersForConference(int id, CancellationToken cancellationToken)
        {
            var result = await _emergencyNumberService.GetEmergencyNumbersForConference(id, cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddEmergencyNumber([FromBody] AddEmergencyNumberRequest request, CancellationToken cancellationToken)
        {
            var result = await _emergencyNumberService.AddEmergencyNumberAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditEmergencyNumber([FromBody] EmergencyNumberModel model, CancellationToken cancellationToken)
        {
            await _emergencyNumberService.EditEmergencyNumberAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteEmergencyNumber(int id, CancellationToken cancellationToken)
        {
            await _emergencyNumberService.DeleteEmergencyNumberPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
