using System.Collections.Generic;

namespace Persistence.Models
{
    public class PointOfInterest
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public int PointOfInterestTypeID { get; set; }

        public virtual PointOfInterestType PointOfInterestType { get; set; }
        public virtual ICollection<ConferencePointOfInterest> ConferencePointOfInterests { get; set; }
    }
}
