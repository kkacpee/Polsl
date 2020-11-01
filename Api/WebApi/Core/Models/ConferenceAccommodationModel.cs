namespace Core.Models
{
    public class ConferenceAccommodationModel
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int AccommodationID { get; set; }

        public virtual AccommodationModel AccommodationModel { get; set; }
        public virtual ConferenceModel ConferenceModel { get; set; }
    }
}
