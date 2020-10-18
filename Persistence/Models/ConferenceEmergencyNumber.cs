namespace Persistence.Models
{
    public class ConferenceEmergencyNumber
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int EmergencyNumberID { get; set; }

        public virtual Conference Conference { get; set; }
        public virtual EmergencyNumber EmergencyNumber { get; set; }
    }
}
