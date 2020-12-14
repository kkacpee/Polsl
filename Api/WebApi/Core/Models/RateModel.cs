namespace Core.Models
{
    public class RateModel
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public int Value { get; set; }
        public int? ConferenceID { get; set; }
        public int? PresentationID { get; set; }
        public int MobileUserID { get; set; }
        public int RateCriterionID { get; set; }

        public virtual ConferenceModel ConferenceModel { get; set; }
        public virtual PresentationModel PresentationModel { get; set; }
        public virtual RateCriterionModel RateCriterionModel { get; set; }
    }
}
