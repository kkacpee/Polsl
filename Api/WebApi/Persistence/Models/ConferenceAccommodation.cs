namespace Persistence.Models
{
    public class ConferenceAccommodation
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int AccommodationID { get; set; }

        public virtual Accommodation Accommodation { get; set; }
        public virtual Conference Conference { get; set; }
    }
}
