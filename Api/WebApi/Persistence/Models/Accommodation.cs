using System.Collections.Generic;

namespace Persistence.Models
{
    public class Accommodation
    {
        public int ID { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Website { get; set; }

        public virtual ICollection<ConferenceAccommodation> ConferenceAccommodations { get; set; }
    }
}
