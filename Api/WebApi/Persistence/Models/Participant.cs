using System.Collections.Generic;

namespace Persistence.Models
{
    public class Participant
    {
        public int ID { get; set; }
        public string Company { get; set; }
        public string Affiliation { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ParticipantPhoto ParticipantPhoto { get; set; }
        public virtual ICollection<PresentationParticipant> PresentationParticipants { get; set; }
    }
}
