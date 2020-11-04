using System;
using System.Collections.Generic;

namespace Core.DTO.Response
{
    public class ConferenceDetailsResponse
    {
        public int ID { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Title { get; set; }
        public string SocialMedia { get; set; }

        public virtual ICollection<BuildingPlanResponse> BuildingPlans { get; set; }
        public virtual ICollection<AccommodationResponse> Accommodations { get; set; }
        public virtual ICollection<SponsorResponse> Sponsors { get; set; }
        public virtual ICollection<PointOfInterestResponse> PointsOfInterest { get; set; }
        public virtual ICollection<EmergencyNumberResponse> EmergencyNumbers { get; set; }
        public virtual ICollection<RateResponse> Rates { get; set; }
        public virtual ICollection<PresentationResponse> Presentations { get; set; }
        public virtual ICollection<OrganizerResponse> Organizers { get; set; }
    }
}
