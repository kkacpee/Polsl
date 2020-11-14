using Core.DTO.Requests;
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
    public class ConferenceController : ControllerBase
    {
        private readonly IConferenceService _conferenceService;
        private readonly IConferenceAccommodationService _conferenceAccommodationService;
        private readonly IConferenceEmergencyNumberService _conferenceEmergencyNumberService;
        private readonly IConferenceOrganizerService _conferenceOrganizerService;
        private readonly IConferencePointOfInterestService _conferencePointOfInterestService;
        private readonly IConferenceSponsorService _conferenceSponsorService;
        private readonly IBuildingPlanService _buildingPlanService;

        public ConferenceController(IConferenceService conferenceService,
            IConferenceAccommodationService conferenceAccommodationService,
            IConferenceEmergencyNumberService conferenceEmergencyNumberService,
            IConferenceOrganizerService conferenceOrganizerService,
            IConferencePointOfInterestService conferencePointOfInterestService,
            IConferenceSponsorService conferenceSponsorService,
            IBuildingPlanService buildingPlanService)
        {
            _conferenceService = conferenceService;
            _conferenceAccommodationService = conferenceAccommodationService;
            _conferenceEmergencyNumberService = conferenceEmergencyNumberService;
            _conferenceOrganizerService = conferenceOrganizerService;
            _conferencePointOfInterestService = conferencePointOfInterestService;
            _conferenceSponsorService = conferenceSponsorService;
            _buildingPlanService = buildingPlanService;
        }

        #region Conference
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

        [HttpGet("get/{id}")]
        [ProducesResponseType(typeof(ConferenceDetailsResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetConferenceDetails(int id, CancellationToken cancellationToken)
        {
            var result = await _conferenceService.GetConferenceDetailsAsync(id, cancellationToken);

            return Ok(result);
        }
        #endregion

        #region ConferenceAccommodation
        [HttpGet("ConferenceAccommodation/get")]
        public async Task<IActionResult> GetAllConferenceAccommodations(CancellationToken cancellationToken)
        {
            var result = await _conferenceAccommodationService.GetAllConferenceAccommodationsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferenceAccommodation/add")]
        public async Task<IActionResult> AddAccommodationToConference([FromBody] AddAccommodationsToConferenceRequest request, CancellationToken cancellationToken)
        {
            await _conferenceAccommodationService.AddAccommodationsToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("ConferenceAccommodation/delete/{id}")]
        public async Task<IActionResult> DeleteConferenceAccommodation(int id, CancellationToken cancellationToken)
        {
            await _conferenceAccommodationService.DeleteAccommodationFromConferencePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ConferenceEmergencyNumber
        [HttpGet("ConferenceEmergencyNumber/get")]
        public async Task<IActionResult> GetAllConferenceEmergencyNumbers(CancellationToken cancellationToken)
        {
            var result = await _conferenceEmergencyNumberService.GetAllConferenceEmergencyNumbersAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferenceEmergencyNumber/add")]
        public async Task<IActionResult> AddEmergencyNumberToConference([FromBody] AddEmergencyNumbersToConferenceRequest request, CancellationToken cancellationToken)
        {
            await _conferenceEmergencyNumberService.AddEmergencyNumbersToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("ConferenceEmergencyNumber/delete/{id}")]
        public async Task<IActionResult> DeleteConferenceEmergencyNumber(int id, CancellationToken cancellationToken)
        {
            await _conferenceEmergencyNumberService.DeleteEmergencyNumberFromConferencePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ConferenceOrganizer
        [HttpGet("ConferenceOrganizer/get")]
        public async Task<IActionResult> GetAllConferenceOrganizers(CancellationToken cancellationToken)
        {
            var result = await _conferenceOrganizerService.GetAllConferenceOrganizersAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferenceOrganizer/add")]
        public async Task<IActionResult> AddOrganizersToConference([FromBody] AddOrganizersToConferenceRequest request, CancellationToken cancellationToken)
        {
            await _conferenceOrganizerService.AddOrganizersToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("ConferenceOrganizer/delete/{id}")]
        public async Task<IActionResult> DeleteConferenceOrganizer(int id, CancellationToken cancellationToken)
        {
            await _conferenceOrganizerService.DeleteOrganizerFromConferencePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ConferencePointOfInterest
        [HttpGet("ConferencePointOfInterest/get")]
        public async Task<IActionResult> GetAllConferencePointsOfInterest(CancellationToken cancellationToken)
        {
            var result = await _conferencePointOfInterestService.GetAllConferencePointsOfInterestAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferencePointOfInterest/add")]
        public async Task<IActionResult> AddPointsOfInterestsoConference([FromBody] AddPointsOfInterestToConferenceRequest request, CancellationToken cancellationToken)
        {
            await _conferencePointOfInterestService.AddPointsOfInterestToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("ConferencePointOfInterest/delete/{id}")]
        public async Task<IActionResult> DeleteConferencePointOfInterest(int id, CancellationToken cancellationToken)
        {
            await _conferencePointOfInterestService.DeletePointOfInterestFromConferencePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ConferenceSponsor
        [HttpGet("ConferenceSponsor/get")]
        public async Task<IActionResult> GetAllConferenceSponsors(CancellationToken cancellationToken)
        {
            var result = await _conferenceSponsorService.GetAllConferenceSponsorsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferenceSponsor/add")]
        public async Task<IActionResult> AddSponsorsToConference([FromBody] AddSponsorsToConferenceRequest request, CancellationToken cancellationToken)
        {
            await _conferenceSponsorService.AddSponsorsToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("ConferenceSponsor/delete/{id}")]
        public async Task<IActionResult> DeleteConferenceSponsor(int id, CancellationToken cancellationToken)
        {
            await _conferenceSponsorService.DeleteSponsorFromConferencePermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region BuildingPlan
        [HttpGet("BuildingPlan/get")]
        public async Task<IActionResult> GetAllBuildingPlans(CancellationToken cancellationToken)
        {
            var result = await _buildingPlanService.GetAllBuildingPlansAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("BuildingPlan/add")]
        public async Task<IActionResult> AddBuildingPlan([FromBody] AddBuildingPlanRequest request, CancellationToken cancellationToken)
        {
            var result = await _buildingPlanService.AddBuildingPlanAsync(request, cancellationToken);

            return Created($"details/{result}", result);
        }

        [HttpDelete("BuildingPlan/delete/{id}")]
        public async Task<IActionResult> DeleteBuildingPlan(int id, CancellationToken cancellationToken)
        {
            await _buildingPlanService.DeleteBuildingPlanPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}
