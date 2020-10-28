namespace Core.Models
{
    public class ConferencePointOfInterestModel
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int PointOfInterestID { get; set; }

        public virtual PointOfInterestModel PointOfInterestModel { get; set; }
        public virtual ConferenceModel ConferenceModel { get; set; }
    }
}
