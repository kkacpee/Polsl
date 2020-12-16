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
    public class SponsorController : ControllerBase
    {
        private readonly ISponsorService _sponsorService;

        public SponsorController(ISponsorService sponsorService)
        {
            _sponsorService = sponsorService;
        }

        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSponsors(CancellationToken cancellationToken)
        {
            var result = await _sponsorService.GetAllSponsorsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet("get/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSponsorsForConference(int id, CancellationToken cancellationToken)
        {
            var result = await _sponsorService.GetSponsorsForConference(id, cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddSponsors([FromBody] AddSponsorRequest request, CancellationToken cancellationToken)
        {
            var result = await _sponsorService.AddSponsorAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditSponsor([FromBody] SponsorModel model, CancellationToken cancellationToken)
        {
            await _sponsorService.EditSponsorAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteSponsors(int id, CancellationToken cancellationToken)
        {
            await _sponsorService.DeleteSponsorPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
