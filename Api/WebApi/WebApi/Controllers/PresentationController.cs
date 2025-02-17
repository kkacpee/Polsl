﻿using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PresentationController : ControllerBase
    {
        private readonly IPresentationService _presentationService;
        private readonly IPresentationTypeService _presentationTypeService;
        private readonly IPresentationParticipantService _presentationParticipantService;
        private readonly IPresentationPhotoService _presentationPhotoService;

        public PresentationController(IPresentationService presentationService,
            IPresentationTypeService presentationTypeService,
            IPresentationParticipantService presentationParticipantService,
            IPresentationPhotoService presentationPhotoService)
        {
            _presentationService = presentationService;
            _presentationTypeService = presentationTypeService;
            _presentationParticipantService = presentationParticipantService;
            _presentationPhotoService = presentationPhotoService;
        }

        #region Presentation
        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllPresentations(CancellationToken cancellationToken)
        {
            var result = await _presentationService.GetPresentationsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddPresentation([FromBody] AddPresentationRequest request, CancellationToken cancellationToken)
        {
            var result = await _presentationService.AddPresentationAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditPresentation([FromBody] PresentationModel model, CancellationToken cancellationToken)
        {
            await _presentationService.EditPresentationAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePresentation(int id, CancellationToken cancellationToken)
        {
            await _presentationService.DeletePresentationPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }

        [HttpGet("get/{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(PresentationDetailsResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPresentationDetails(int id, CancellationToken cancellationToken)
        {
            var result = await _presentationService.GetPresentationDetailsAsync(id, cancellationToken);

            return Ok(result);
        }
        #endregion

        #region PresentationType
        [HttpGet("PresentationType/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllPresentationTypes(CancellationToken cancellationToken)
        {
            var result = await _presentationTypeService.GetAllPresentationTypesAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("PresentationType/add")]
        public async Task<IActionResult> AddPresentationType([FromBody] AddPresentationTypeRequest request, CancellationToken cancellationToken)
        {
            var result = await _presentationTypeService.AddPresentationTypeAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpPut("PresentationType/edit")]
        public async Task<IActionResult> EditPresentationType([FromBody] PresentationTypeModel model, CancellationToken cancellationToken)
        {
            await _presentationTypeService.EditPresentationTypeAsync(model, cancellationToken);

            return Ok();
        }

        [HttpDelete("PresentationType/delete/{id}")]
        public async Task<IActionResult> DeletePresentationType(int id, CancellationToken cancellationToken)
        {
            await _presentationTypeService.DeletePresentationTypePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region PresentationParticipant
        [HttpGet("PresentationParticipant/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllPresentationParticipants(CancellationToken cancellationToken)
        {
            var result = await _presentationParticipantService.GetAllPresentationParticipantsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("PresentationParticipant/add")]
        public async Task<IActionResult> AddPresentationParticipant([FromBody] PresentationParticipantRequest request, CancellationToken cancellationToken)
        {
            await _presentationParticipantService.AddParticipantsToPresentationAsync(request, cancellationToken);

            return Ok();
        }

        [HttpPost("PresentationParticipant/delete")]
        public async Task<IActionResult> DeletePresentationParticipant([FromBody] PresentationParticipantRequest request, CancellationToken cancellationToken)
        {
            await _presentationParticipantService.DeleteParticipantFromPresentationPermanentlyAsync(request, cancellationToken);

            return NoContent();
        }
        #endregion

        #region PresentationPhoto
        [HttpPost("PresentationPhoto/add")]
        public async Task<IActionResult> AddPresentationPhoto([FromForm] AddPresentationPhotoRequest request, CancellationToken cancellationToken)
        {
            await _presentationPhotoService.AddPresentationPhoto(request, cancellationToken);

            return Ok();
        }

        [HttpPut("PresentationPhoto/change")]
        public async Task<IActionResult> ChangePresentationMainPhoto([FromBody] ChangePresentationMainPhotoRequest request, CancellationToken cancellationToken)
        {
            await _presentationPhotoService.ChangeMainPhoto(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("PresentationPhoto/delete/{id}")]
        public async Task<IActionResult> DeletePresentationPhoto(int id, CancellationToken cancellationToken)
        {
            await _presentationPhotoService.DeletePresentationPhotoPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}
