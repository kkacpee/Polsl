using System.Collections.Generic;

namespace Persistence.Models
{
    public class Speaker
    {
        public int ID { get; set; }
        public string Company { get; set; }
        public string Univeristy { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<SpeakerPhoto> SpeakerPhotos { get; set; }
        public virtual ICollection<PresentationSpeaker> PresentationSpeakers { get; set; }
    }
}
