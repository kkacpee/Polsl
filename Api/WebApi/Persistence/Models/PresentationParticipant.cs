namespace Persistence.Models
{
    public class PresentationParticipant
    {
        public int ID { get; set; }
        public int PresentationID { get; set; }
        public int ParticipantID { get; set; }
        public bool IsAuthor { get; set; }
        public bool IsSpeaker { get; set; }

        public virtual Presentation Presentation { get; set; }
        public virtual Participant Participant { get; set; }
    }
}
