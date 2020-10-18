using System.Collections.Generic;

namespace Persistence.Models
{
    public class Sponsor
    {
        public int ID { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string LogoPath { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Website { get; set; }

        public virtual ICollection<ConferenceSponsor> ConferenceSponsors { get; set; }
    }
}
