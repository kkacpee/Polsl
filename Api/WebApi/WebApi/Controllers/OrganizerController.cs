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
    public class OrganizerController : ControllerBase
    {
        private readonly IOrganizerService _organizerService;

        public OrganizerController(IOrganizerService organizerService)
        {
            _organizerService = organizerService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetOrganizers(CancellationToken cancellationToken)
        {
            var result = await _organizerService.GetAllOrganizersAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetOrganizersForConference(int id, CancellationToken cancellationToken)
        {
            var result = await _organizerService.GetOrganizersForConference(id, cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddOrganizers([FromBody] AddOrganizerRequest request, CancellationToken cancellationToken)
        {
            var result = await _organizerService.AddOrganizerAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditOrganizer([FromBody] OrganizerModel model, CancellationToken cancellationToken)
        {
            await _organizerService.EditOrganizerAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteOrganizers(int id, CancellationToken cancellationToken)
        {
            await _organizerService.DeleteOrganizerPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
