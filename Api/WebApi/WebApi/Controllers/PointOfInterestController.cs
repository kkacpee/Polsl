using Core.DTO.Requests;
using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointOfInterestController : ControllerBase
    {
        private readonly IPointOfInterestService _pointOfInterestService;
        private readonly IPointOfInterestTypeService _pointOfInterestTypeService;

        public PointOfInterestController(IPointOfInterestService pointOfInterestService,
            IPointOfInterestTypeService pointOfInterestTypeService)
        {
            _pointOfInterestService = pointOfInterestService;
            _pointOfInterestTypeService = pointOfInterestTypeService;
        }

        #region PointOfInterest
        [HttpGet("get")]
        public async Task<IActionResult> GetPointOfInterests(CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestService.GetAllPointsOfInterestAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddPointOfInterests([FromBody] AddPointOfInterestRequest request, CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestService.AddPointOfInterestAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePointOfInterests(int id, CancellationToken cancellationToken)
        {
            await _pointOfInterestService.DeletePointOfInterestPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region PointOfInterestType
        [HttpGet("PointOfInterestType/get")]
        public async Task<IActionResult> GetPointOfInterestTypes(CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestTypeService.GetAllPointOfInterestTypesAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("PointOfInterestType/add")]
        public async Task<IActionResult> AddPointOfInterestType([FromBody] AddPointOfInterestTypeRequest request, CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestTypeService.AddPointOfInterestTypeAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("PointOfInterestType/delete/{id}")]
        public async Task<IActionResult> DeletePointOfInterestType(int id, CancellationToken cancellationToken)
        {
            await _pointOfInterestTypeService.DeletePointOfInterestTypePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}
