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
    public class ParticipantController : ControllerBase
    {
        private readonly IParticipantService _participantService;
        private readonly IParticipantPhotoService _participantPhotoService;

        public ParticipantController(IParticipantService participantService,
            IParticipantPhotoService participantPhotoService)
        {
            _participantService = participantService;
            _participantPhotoService = participantPhotoService;
        }

        #region Presentation
        [HttpGet("get")]
        public async Task<IActionResult> GetParticipants(CancellationToken cancellationToken)
        {
            var result = await _participantService.GetAllParticipantsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetParticipantsForPresentation(int id, CancellationToken cancellationToken)
        {
            var result = await _participantService.GetParticipantsForPresentationAsync(id, cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddParticipants([FromBody] AddParticipantRequest request, CancellationToken cancellationToken)
        {
            var result = await _participantService.AddParticipantAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditParticipant([FromBody] ParticipantModel model, CancellationToken cancellationToken)
        {
            await _participantService.EditParticipantAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteParticipants(int id, CancellationToken cancellationToken)
        {
            await _participantService.DeleteParticipantPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region PresentationPhoto
        [HttpGet("PresentationPhoto/get")]
        public async Task<IActionResult> GetParticipantPhotos(CancellationToken cancellationToken)
        {
            var result = await _participantPhotoService.GetAllParticipantPhotosAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("PresentationPhoto/add")]
        public async Task<IActionResult> AddParticipantPhotos([FromBody] AddParticipantPhotoRequest request, CancellationToken cancellationToken)
        {
            var result = await _participantPhotoService.AddParticipantPhotoAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("PresentationPhoto/delete/{id}")]
        public async Task<IActionResult> DeleteParticipantPhotos(int id, CancellationToken cancellationToken)
        {
            await _participantPhotoService.DeleteParticipantPhotoPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}
