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
        public async Task<IActionResult> GetPointsOfInterest(CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestService.GetAllPointsOfInterestAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetPointsOfInterestForConference(int id, CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestService.GetPointsOfInterestForConference(id, cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddPointOfInterests([FromBody] AddPointOfInterestRequest request, CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestService.AddPointOfInterestAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditPointOfInterest([FromBody] PointOfInterestModel model, CancellationToken cancellationToken)
        {
            await _pointOfInterestService.EditPointOfInterestAsync(model, cancellationToken);

            return Ok();
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
