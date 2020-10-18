namespace Persistence.Models
{
    public class Rate
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public int Value { get; set; }
        public int ConferenceID { get; set; }
        public int PresentationID { get; set; }
        public int UserID { get; set; }
        public int RateCriterionID { get; set; }

        public virtual Conference Conference { get; set; }
        public virtual Presentation Presentation { get; set; }
        public virtual User User { get; set; }
        public virtual RateCriterion RateCriterion { get; set; }
    }
}
