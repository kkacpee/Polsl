namespace Persistence.Models
{
    public class ConferencePointOfInterest
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int PointOfInterestID { get; set; }

        public virtual PointOfInterest PointOfInterest { get; set; }
        public virtual Conference Conference { get; set; }
    }
}
