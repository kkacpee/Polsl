using Core.DTO.Requests;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System.IO;
using System.Net;
using System.Net.Http.Headers;
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
        private readonly IPointOfInterestIconService _pointOfInterestIconService;

        public PointOfInterestController(IPointOfInterestService pointOfInterestService,
            IPointOfInterestTypeService pointOfInterestTypeService,
            IPointOfInterestIconService pointOfInterestIconService)
        {
            _pointOfInterestService = pointOfInterestService;
            _pointOfInterestTypeService = pointOfInterestTypeService;
            _pointOfInterestIconService = pointOfInterestIconService;
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

        [HttpPost("PointOfInterestType/edit")]
        public async Task<IActionResult> EditPointOfInterestType([FromBody] PointOfInterestTypeModel model, CancellationToken cancellationToken)
        {
            await _pointOfInterestTypeService.EditPointOfInterestTypeAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("PointOfInterestType/delete/{id}")]
        public async Task<IActionResult> DeletePointOfInterestType(int id, CancellationToken cancellationToken)
        {
            await _pointOfInterestTypeService.DeletePointOfInterestTypePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region PointOfInterestIcon
        [HttpGet("PointOfInterestIcon/get")]
        public async Task<IActionResult> GetPointOfInterestIcons(CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestIconService.GetAllPointOfInterestIconsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet("PointOfInterestIcon/get/{id}")]
        [ProducesResponseType(typeof(FileResult), (int)HttpStatusCode.OK)]
        public async Task<FileResult> GetPointOfInterestIcon(int id, CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestIconService.GetPhotoById(id, cancellationToken);
            var folderName = Path.Combine("Resources", "Icons");
            var path = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            IFileProvider provider = new PhysicalFileProvider(path);
            IFileInfo fileInfo = provider.GetFileInfo(result);
            var readStream = fileInfo.CreateReadStream();

            return File(readStream, "image/jpeg", "siema");
        }

        [HttpPost("PointOfInterestIcon/add"), DisableRequestSizeLimit]
        public async Task<IActionResult> AddPointOfInterestIcon(IFormFile file, CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestIconService.AddPointOfInterestIconAsync(file, cancellationToken);

            return Ok(result);
        }

        [HttpDelete("PointOfInterestIcon/delete/{id}")]
        public async Task<IActionResult> DeletePointOfInterestIcon(int id, CancellationToken cancellationToken)
        {
            await _pointOfInterestIconService.DeletePointOfInterestIconPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}
