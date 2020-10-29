using Core.DTO.Requests;
using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmergencyNumberController : ControllerBase
    {
        private readonly IEmergencyNumberService _emergencyNumberService;

        public EmergencyNumberController(IEmergencyNumberService emergencyNumberService)
        {
            _emergencyNumberService = emergencyNumberService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetEmergencyNumbers(CancellationToken cancellationToken)
        {
            var result = await _emergencyNumberService.GetAllEmergencyNumbers(cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddEmergencyNumber([FromBody] AddEmergencyNumberRequest request, CancellationToken cancellationToken)
        {
            var result = await _emergencyNumberService.AddEmergencyNumberAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteEmergencyNumber(int id, CancellationToken cancellationToken)
        {
            await _emergencyNumberService.DeleteEmergencyNumberPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
