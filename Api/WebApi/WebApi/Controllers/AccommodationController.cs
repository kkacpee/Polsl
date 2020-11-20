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
    public class AccommodationController : ControllerBase
    {
        private readonly IAccommodationService _accommodationService;

        public AccommodationController(IAccommodationService accommodationService)
        {
            _accommodationService = accommodationService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAccommodations(CancellationToken cancellationToken)
        {
            var result = await _accommodationService.GetAllAccommodations(cancellationToken);

            return Ok(result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetAccommodationsForConference(int id, CancellationToken cancellationToken)
        {
            var result = await _accommodationService.GetAccommodationsForConference(id, cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddAccommodation([FromBody] AddAccommodationRequest request, CancellationToken cancellationToken)
        {
            var result = await _accommodationService.AddAccommodationAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditAccommodation([FromBody] AccommodationModel model, CancellationToken cancellationToken)
        {
            await _accommodationService.EditAccommodationAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAccommodation(int id, CancellationToken cancellationToken)
        {
            await _accommodationService.DeleteAccommodationPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
