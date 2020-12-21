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
    public class RateController : ControllerBase
    {
        private readonly IRateService _rateService;
        private readonly IRateCriterionTypeService _rateCriterionTypeService;
        private readonly IRateCriterionService _rateCriterionService;

        public RateController(IRateService rateService,
            IRateCriterionTypeService rateCriterionTypeService,
            IRateCriterionService rateCriterionService)
        {
            _rateService = rateService;
            _rateCriterionTypeService = rateCriterionTypeService;
            _rateCriterionService = rateCriterionService;
        }

        #region Rate
        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRates(CancellationToken cancellationToken)
        {
            var result = await _rateService.GetAllRatesAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet("get/{id}/conference")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRatesForConference(int id, CancellationToken cancellationToken)
        {
            var result = await _rateService.GetRatesForConference(id, cancellationToken);

            return Ok(result);
        }

        [HttpGet("get/{id}/presentation")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRatesForPresentation(int id, CancellationToken cancellationToken)
        {
            var result = await _rateService.GetRatesForPresentation(id, cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddRate([FromBody] AddRateRequest request, CancellationToken cancellationToken)
        {
            var result = await _rateService.AddRateAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditRate([FromBody] RateModel model, CancellationToken cancellationToken)
        {
            await _rateService.EditRateAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteRates(int id, CancellationToken cancellationToken)
        {
            await _rateService.DeleteRatePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region RateCriterion
        [HttpGet("RateCriterion/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRateCriterions(CancellationToken cancellationToken)
        {
            var result = await _rateCriterionService.GetAllRateCrtiterionsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("RateCriterion/add")]
        public async Task<IActionResult> AddRateCriterion([FromBody] AddRateCriterionRequest request, CancellationToken cancellationToken)
        {
            var result = await _rateCriterionService.AddRateCriterionAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPut("RateCriterion/edit")]
        public async Task<IActionResult> EditRateCriterion([FromBody] RateCriterionModel model, CancellationToken cancellationToken)
        {
            await _rateCriterionService.EditRateCriterionAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("RateCriterion/delete/{id}")]
        public async Task<IActionResult> DeleteRateCriterion(int id, CancellationToken cancellationToken)
        {
            await _rateCriterionService.DeleteRateCriterionPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region RateCriterionType
        [HttpGet("RateCriterionType/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRateCriterionTypes(CancellationToken cancellationToken)
        {
            var result = await _rateCriterionTypeService.GetAlRateCriterionTypesAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("RateCriterionType/add")]
        public async Task<IActionResult> AddRateCriterionType(AddRateCriterionTypeRequest request, CancellationToken cancellationToken)
        {
            var result = await _rateCriterionTypeService.AddRateCriterionTypeAsync(request, cancellationToken);

            return Ok(result);
        }

        [HttpPut("RateCriterionType/edit")]
        public async Task<IActionResult> EditRateCriterionType([FromBody] RateCriterionTypeModel model, CancellationToken cancellationToken)
        {
            await _rateCriterionTypeService.EditRateCriterionTypeAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("RateCriterionType/delete/{id}")]
        public async Task<IActionResult> DeleteRateCriterionType(int id, CancellationToken cancellationToken)
        {
            await _rateCriterionTypeService.DeleteRateCriterionTypePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}
