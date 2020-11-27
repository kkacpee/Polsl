using System.Collections.Generic;
using System.Xml.Linq;

namespace Persistence.Models
{
    public class PointOfInterestIcon
    {
        public int ID { get; set; }
        public string Path { get; set; }

        public virtual ICollection<PointOfInterestType> PointOfInterestTypes { get; set; }
    }
}
