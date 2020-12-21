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
        [AllowAnonymous]
        public async Task<IActionResult> GetParticipants(CancellationToken cancellationToken)
        {
            var result = await _participantService.GetAllParticipantsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet("get/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetParticipantsForPresentation(int id, CancellationToken cancellationToken)
        {
            var result = await _participantService.GetParticipantsForPresentationAsync(id, cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddParticipant([FromForm] AddParticipantWithPhotoRequest request, CancellationToken cancellationToken)
        {
            var participant = new AddParticipantRequest
            {
                Affiliation = request.Affiliation,
                Company = request.Company,
                Country = request.Country,
                Description = request.Description,
                FirstName = request.FirstName,
                LastName = request.LastName
            };

            var result = await _participantService.AddParticipantAsync(participant, cancellationToken);

            var participantPhoto = new AddParticipantPhotoRequest
            {
                ParticipantID = result,
                File = request.File
            };
           

            await _participantPhotoService.AddParticipantPhotoAsync(participantPhoto, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditParticipant([FromBody] ParticipantModel model, CancellationToken cancellationToken)
        {
            await _participantService.EditParticipantAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteParticipants(int id, CancellationToken cancellationToken)
        {
            await _participantPhotoService.DeleteParticipantPhotoPermanentlyAsync(id, cancellationToken);
            await _participantService.DeleteParticipantPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ParticipantPhoto
        [HttpGet("ParticipantPhoto/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetParticipantPhotos(CancellationToken cancellationToken)
        {
            var result = await _participantPhotoService.GetAllParticipantPhotosAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ParticipantPhoto/edit")]
        public async Task<IActionResult> EditParticipantPhotos([FromForm] AddParticipantPhotoRequest request, CancellationToken cancellationToken)
        {
            await _participantPhotoService.EditParticipantPhotoAsync(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("ParticipantPhoto/delete/{id}")]
        public async Task<IActionResult> DeleteParticipantPhotos(int id, CancellationToken cancellationToken)
        {
            await _participantPhotoService.DeleteParticipantPhotoPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}
