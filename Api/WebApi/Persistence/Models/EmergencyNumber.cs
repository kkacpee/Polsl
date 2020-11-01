using System.Collections.Generic;

namespace Persistence.Models
{
    public class EmergencyNumber
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }

        public virtual ICollection<ConferenceEmergencyNumber> ConferenceEmergencyNumbers { get; set; }
    }
}
