using System.Collections.Generic;

namespace Persistence.Models
{
    public class PointOfInterestType
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int PointOfInterestIconID { get; set; }

        public virtual PointOfInterestIcon PointOfInterestIcon { get; set; }
        public virtual ICollection<PointOfInterest> PointsOfInterest { get; set; }
    }
}
