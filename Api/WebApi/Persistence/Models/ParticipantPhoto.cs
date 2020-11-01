namespace Persistence.Models
{
    public class ParticipantPhoto
    {
        public int ID { get; set; }
        public string Path { get; set; }
        public int ParticipantID { get; set; }

        public virtual Participant Participant { get; set; }
    }
}
