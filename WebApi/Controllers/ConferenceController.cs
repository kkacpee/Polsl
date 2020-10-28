using Core.DTO.Requests;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConferenceController : ControllerBase
    {
        private readonly IConferenceService _conferenceService;

        public ConferenceController(IConferenceService conferenceService)
        {
            _conferenceService = conferenceService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAllConferences(CancellationToken cancellationToken)
        {
            var result = await _conferenceService.GetConferencesAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddConference([FromBody] AddConferenceRequest request, CancellationToken cancellationToken)
        {
            var result = await _conferenceService.AddConferenceAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteConference(int id, CancellationToken cancellationToken)
        {
            await _conferenceService.DeleteConferencePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }

        
    }
}
