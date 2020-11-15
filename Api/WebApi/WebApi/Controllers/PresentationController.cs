﻿using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Interfaces.Services;
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

        public PresentationController(IPresentationService presentationService,
            IPresentationTypeService presentationTypeService,
            IPresentationParticipantService presentationParticipantService)
        {
            _presentationService = presentationService;
            _presentationTypeService = presentationTypeService;
            _presentationParticipantService = presentationParticipantService;
        }

        #region Presentation
        [HttpGet("get")]
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

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePresentation(int id, CancellationToken cancellationToken)
        {
            await _presentationService.DeletePresentationPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }

        [HttpGet("get/{id}")]
        [ProducesResponseType(typeof(PresentationDetailsResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPresentationDetails(int id, CancellationToken cancellationToken)
        {
            var result = await _presentationService.GetPresentationDetailsAsync(id, cancellationToken);

            return Ok(result);
        }
        #endregion

        #region PresentationType
        [HttpGet("PresentationType/get")]
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

        [HttpDelete("PresentationType/delete/{id}")]
        public async Task<IActionResult> DeletePresentationType(int id, CancellationToken cancellationToken)
        {
            await _presentationTypeService.DeletePresentationTypePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region PresentationParticipant
        [HttpGet("PresentationParticipant/get")]
        public async Task<IActionResult> GetAllPresentationParticipants(CancellationToken cancellationToken)
        {
            var result = await _presentationParticipantService.GetAllPresentationParticipantsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("PresentationParticipant/add")]
        public async Task<IActionResult> AddPresentationParticipant([FromBody] AddParticipantsToPresentationRequest request, CancellationToken cancellationToken)
        {
            await _presentationParticipantService.AddParticipantsToPresentationAsync(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("PresentationParticipant/delete/{id}")]
        public async Task<IActionResult> DeletePresentationParticipant(int id, CancellationToken cancellationToken)
        {
            await _presentationParticipantService.DeleteParticipantFromPresentationPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}
