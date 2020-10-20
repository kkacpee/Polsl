using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresentationController : ControllerBase
    {
        private readonly IPresentationService _presentationService;

        public PresentationController(IPresentationService presentationService)
        {
            _presentationService = presentationService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetPresentations(CancellationToken cancellationToken)
        {
            var result = await _presentationService.GetAllPresentations(cancellationToken);

            return Ok(result);
        }
    }
}
