using Core.DTO.Requests;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System.IO;
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
        [AllowAnonymous]
        public async Task<IActionResult> GetBuildingPlans(CancellationToken cancellationToken)
        {
            var result = await _buildingPlanService.GetAllBuildingPlansAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddBuildingPlan([FromForm] AddBuildingPlanRequest request, CancellationToken cancellationToken)
        {
            var result = await _buildingPlanService.AddBuildingPlanAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditBuildingPlan([FromBody] BuildingPlanModel model, CancellationToken cancellationToken)
        {
            await _buildingPlanService.EditBuildingPlanAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBuildingPlan(int id, CancellationToken cancellationToken)
        {
            await _buildingPlanService.DeleteBuildingPlanPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
