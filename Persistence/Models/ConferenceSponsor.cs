namespace Persistence.Models
{
    public class ConferenceSponsor
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int SponsorID { get; set; }

        public virtual Sponsor Sponsor { get; set; }
        public virtual Conference Conference { get; set; }
    }
}
