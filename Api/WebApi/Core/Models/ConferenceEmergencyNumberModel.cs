namespace Core.Models
{
    public class ConferenceEmergencyNumberModel
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int EmergencyNumberID { get; set; }

        public virtual ConferenceModel ConferenceModel { get; set; }
        public virtual EmergencyNumberModel EmergencyNumberModel { get; set; }
    }
}
