namespace Persistence.Models
{
    public class ConferencePhoto
    {
        public int ID { get; set; }
        public string Path { get; set; }
        public int ConferenceID { get; set; }
        public bool IsMain { get; set; }

        public virtual Conference Conference { get; set; }
    }
}
