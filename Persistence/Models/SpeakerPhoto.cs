namespace Persistence.Models
{
    public class SpeakerPhoto
    {
        public int ID { get; set; }
        public string Path { get; set; }
        public int SpeakerID { get; set; }

        public virtual Speaker Speaker { get; set; }
    }
}
