using Persistence.Models;
using System;
using System.Collections.Generic;

namespace Persistence.Models
{
    public class Conference
    {
        public int ID { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Title { get; set; }
        public string YouTubeLink { get; set; }

        public virtual ICollection<BuildingPlan> BuildingPlans { get; set; }
        public virtual ICollection<ConferenceAccommodation> ConferenceAccommodations { get; set; }
        public virtual ICollection<ConferenceSponsor> ConferenceSponsors { get; set; }
        public virtual ICollection<ConferencePointOfInterest> ConferencePointOfInterests { get; set; }
        public virtual ICollection<ConferenceEmergencyNumber> ConferenceEmergencyNumbers { get; set; }
        public virtual ICollection<Rate> Rates { get; set; }
        public virtual ICollection<Presentation> Presentations { get; set; }
        public virtual ICollection<ConferenceOrganizer> ConferenceOrganizers { get; set; }
    }
}
