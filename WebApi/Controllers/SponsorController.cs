using Core.DTO.Requests;
using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorController : ControllerBase
    {
        private readonly ISponsorService _sponsorService;

        public SponsorController(ISponsorService sponsorService)
        {
            _sponsorService = sponsorService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetSponsors(CancellationToken cancellationToken)
        {
            var result = await _sponsorService.GetAllSponsorsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddSponsors([FromBody] AddSponsorRequest request, CancellationToken cancellationToken)
        {
            var result = await _sponsorService.AddSponsorAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteSponsors(int id, CancellationToken cancellationToken)
        {
            await _sponsorService.DeleteSponsorPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
