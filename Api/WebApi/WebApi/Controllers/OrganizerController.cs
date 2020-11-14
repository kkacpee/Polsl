﻿using Core.DTO.Requests;
using Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrganizerController : ControllerBase
    {
        private readonly IOrganizerService _organizerService;

        public OrganizerController(IOrganizerService organizerService)
        {
            _organizerService = organizerService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetOrganizers(CancellationToken cancellationToken)
        {
            var result = await _organizerService.GetAllOrganizersAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddOrganizers([FromBody] AddOrganizerRequest request, CancellationToken cancellationToken)
        {
            var result = await _organizerService.AddOrganizerAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteOrganizers(int id, CancellationToken cancellationToken)
        {
            await _organizerService.DeleteOrganizerPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
