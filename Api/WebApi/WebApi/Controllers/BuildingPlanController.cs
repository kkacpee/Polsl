using Core.DTO.Requests;
using Core.Interfaces.Services;
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
    public class BuildingPlanController : ControllerBase
    {
        private readonly IBuildingPlanService _buildingPlanService;

        public BuildingPlanController(IBuildingPlanService buildingPlanService)
        {
            _buildingPlanService = buildingPlanService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetBuildingPlans(CancellationToken cancellationToken)
        {
            var result = await _buildingPlanService.GetAllBuildingPlansAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddBuildingPlan([FromBody] AddBuildingPlanRequest request, CancellationToken cancellationToken)
        {
            var result = await _buildingPlanService.AddBuildingPlanAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBuildingPlan(int id, CancellationToken cancellationToken)
        {
            await _buildingPlanService.DeleteBuildingPlanPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
