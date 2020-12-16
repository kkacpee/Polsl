using Core.DTO.Requests;
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
    public class ConferenceController : ControllerBase
    {
        private readonly IConferenceService _conferenceService;
        private readonly IConferenceAccommodationService _conferenceAccommodationService;
        private readonly IConferenceEmergencyNumberService _conferenceEmergencyNumberService;
        private readonly IConferenceOrganizerService _conferenceOrganizerService;
        private readonly IConferencePointOfInterestService _conferencePointOfInterestService;
        private readonly IConferenceSponsorService _conferenceSponsorService;
        private readonly IBuildingPlanService _buildingPlanService;
        private readonly IConferencePhotoService _conferencePhotoService;

        public ConferenceController(IConferenceService conferenceService,
            IConferenceAccommodationService conferenceAccommodationService,
            IConferenceEmergencyNumberService conferenceEmergencyNumberService,
            IConferenceOrganizerService conferenceOrganizerService,
            IConferencePointOfInterestService conferencePointOfInterestService,
            IConferenceSponsorService conferenceSponsorService,
            IBuildingPlanService buildingPlanService,
            IConferencePhotoService conferencePhotoService)
        {
            _conferenceService = conferenceService;
            _conferenceAccommodationService = conferenceAccommodationService;
            _conferenceEmergencyNumberService = conferenceEmergencyNumberService;
            _conferenceOrganizerService = conferenceOrganizerService;
            _conferencePointOfInterestService = conferencePointOfInterestService;
            _conferenceSponsorService = conferenceSponsorService;
            _buildingPlanService = buildingPlanService;
            _conferencePhotoService = conferencePhotoService;
        }

        #region Conference
        [HttpGet("get")]
        [AllowAnonymous]
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

        [HttpPost("edit")]
        public async Task<IActionResult> EditConference([FromBody] ConferenceModel model, CancellationToken cancellationToken)
        {
            await _conferenceService.EditConferenceAsync(model, cancellationToken);

            return Ok();
        }

        [HttpGet("get/{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ConferenceDetailsResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetConferenceDetails(int id, CancellationToken cancellationToken)
        {
            var result = await _conferenceService.GetConferenceDetailsAsync(id, cancellationToken);

            return Ok(result);
        }
        #endregion

        #region ConferenceAccommodation
        [HttpGet("ConferenceAccommodation/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllConferenceAccommodations(CancellationToken cancellationToken)
        {
            var result = await _conferenceAccommodationService.GetAllConferenceAccommodationsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferenceAccommodation/add")]
        public async Task<IActionResult> AddAccommodationToConference([FromBody] ConferenceAccommodationRequest request, CancellationToken cancellationToken)
        {
            await _conferenceAccommodationService.AddAccommodationsToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpPost("ConferenceAccommodation/delete")]
        public async Task<IActionResult> DeleteConferenceAccommodation([FromBody] ConferenceAccommodationRequest request, CancellationToken cancellationToken)
        {
            await _conferenceAccommodationService.DeleteAccommodationFromConferencePermanentlyAsync(request, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ConferenceEmergencyNumber
        [HttpGet("ConferenceEmergencyNumber/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllConferenceEmergencyNumbers(CancellationToken cancellationToken)
        {
            var result = await _conferenceEmergencyNumberService.GetAllConferenceEmergencyNumbersAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferenceEmergencyNumber/add")]
        public async Task<IActionResult> AddEmergencyNumberToConference([FromBody] ConferenceEmergencyNumberRequest request, CancellationToken cancellationToken)
        {
            await _conferenceEmergencyNumberService.AddEmergencyNumbersToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpPost("ConferenceEmergencyNumber/delete")]
        public async Task<IActionResult> DeleteConferenceEmergencyNumber([FromBody] ConferenceEmergencyNumberRequest request, CancellationToken cancellationToken)
        {
            await _conferenceEmergencyNumberService.DeleteEmergencyNumberFromConferencePermanentlyAsync(request, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ConferenceOrganizer
        [HttpGet("ConferenceOrganizer/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllConferenceOrganizers(CancellationToken cancellationToken)
        {
            var result = await _conferenceOrganizerService.GetAllConferenceOrganizersAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferenceOrganizer/add")]
        public async Task<IActionResult> AddOrganizersToConference([FromBody] ConferenceOrganizerRequest request, CancellationToken cancellationToken)
        {
            await _conferenceOrganizerService.AddOrganizersToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpPost("ConferenceOrganizer/delete")]
        public async Task<IActionResult> DeleteConferenceOrganizer([FromBody] ConferenceOrganizerRequest request, CancellationToken cancellationToken)
        {
            await _conferenceOrganizerService.DeleteOrganizerFromConferencePermanentlyAsync(request, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ConferencePointOfInterest
        [HttpGet("ConferencePointOfInterest/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllConferencePointsOfInterest(CancellationToken cancellationToken)
        {
            var result = await _conferencePointOfInterestService.GetAllConferencePointsOfInterestAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferencePointOfInterest/add")]
        public async Task<IActionResult> AddPointsOfInterestsoConference([FromBody] ConferencePointOfInterestRequest request, CancellationToken cancellationToken)
        {
            await _conferencePointOfInterestService.AddPointsOfInterestToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpPost("ConferencePointOfInterest/delete")]
        public async Task<IActionResult> DeleteConferencePointOfInterest([FromBody] ConferencePointOfInterestRequest request, CancellationToken cancellationToken)
        {
            await _conferencePointOfInterestService.DeletePointOfInterestFromConferencePermanentlyAsync(request, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ConferenceSponsor
        [HttpGet("ConferenceSponsor/get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllConferenceSponsors(CancellationToken cancellationToken)
        {
            var result = await _conferenceSponsorService.GetAllConferenceSponsorsAsync(cancellationToken);

            return Ok(result);
        }

        [HttpPost("ConferenceSponsor/add")]
        public async Task<IActionResult> AddSponsorsToConference([FromBody] ConferenceSponsorRequest request, CancellationToken cancellationToken)
        {
            await _conferenceSponsorService.AddSponsorsToConferenceAsync(request, cancellationToken);

            return Ok();
        }

        [HttpPost("ConferenceSponsor/delete")]
        public async Task<IActionResult> DeleteConferenceSponsor([FromBody] ConferenceSponsorRequest request, CancellationToken cancellationToken)
        {
            await _conferenceSponsorService.DeleteSponsorFromConferencePermanentlyAsync(request, cancellationToken);

            return NoContent();
        }
        #endregion

        #region ConferencePhoto
        [HttpPost("ConferencePhoto/add")]
        public async Task<IActionResult> AddConferencePhoto([FromForm] AddConferencePhotoRequest request, CancellationToken cancellationToken)
        {
            await _conferencePhotoService.AddConferencePhoto(request, cancellationToken);

            return Ok();
        }

        [HttpPost("ConferencePhoto/change")]
        public async Task<IActionResult> ChangeConferenceMainPhoto([FromBody] ChangeConferenceMainPhotoRequest request, CancellationToken cancellationToken)
        {
            await _conferencePhotoService.ChangeMainPhoto(request, cancellationToken);

            return Ok();
        }

        [HttpDelete("ConferencePhoto/delete/{id}")]
        public async Task<IActionResult> DeleteConferencePhoto(int id, CancellationToken cancellationToken)
        {
            await _conferencePhotoService.DeleteConferencePhotoPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion

        #region BuildingPlan
        [HttpGet("BuildingPlan/get")]
        [AllowAnonymous]
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

        [HttpPost("BuildingPlan/delete/{id}")]
        public async Task<IActionResult> DeleteBuildingPlan(int id, CancellationToken cancellationToken)
        {
            await _buildingPlanService.DeleteBuildingPlanPermanentlyAsync(id, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}
