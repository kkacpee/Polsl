using System.Collections.Generic;

namespace Persistence.Models
{
    public class PresentationType
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Presentation> Presentations { get; set; }
    }
}
