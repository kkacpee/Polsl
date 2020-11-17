using System.Collections.Generic;
using System.Xml.Linq;

namespace Persistence.Models
{
    public class PointOfInterestIcon
    {
        public int ID { get; set; }
        public string XmlContent { get; set; }

        public XElement XmlValueWrapper
        {
            get { return XElement.Parse(XmlContent); }
            set { XmlContent = value.ToString(); }
        }
        public virtual ICollection<PointOfInterestType> PointOfInterestTypes { get; set; }
    }
}
