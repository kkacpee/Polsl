namespace Persistence.Models
{
    public class PresentationSpeaker
    {
        public int ID { get; set; }
        public int PresentationID { get; set; }
        public int SpeakerID { get; set; }

        public virtual Presentation Presentation { get; set; }
        public virtual Speaker Speaker { get; set; }
    }
}
