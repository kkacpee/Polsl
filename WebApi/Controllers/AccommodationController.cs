using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
    }
}
