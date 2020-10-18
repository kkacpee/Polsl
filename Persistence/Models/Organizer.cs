using System.Collections.Generic;

namespace Persistence.Models
{
    public class Organizer
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string University { get; set; }
        public string Company { get; set; }
        public string Contact { get; set; }

        public virtual ICollection<ConferenceOrganizer> ConferenceOrganizers { get; set; }

    }
}
