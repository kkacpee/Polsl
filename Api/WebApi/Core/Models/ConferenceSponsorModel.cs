namespace Core.Models
{
    public class ConferenceSponsorModel
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int SponsorID { get; set; }

        public virtual SponsorModel SponsorModel { get; set; }
        public virtual ConferenceModel ConferenceModel { get; set; }
    }
}
