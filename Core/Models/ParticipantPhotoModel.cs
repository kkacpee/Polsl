namespace Core.Models
{
    public class ParticipantPhotoModel
    {
        public int ID { get; set; }
        public string Path { get; set; }
        public int ParticipantID { get; set; }

        public virtual ParticipantModel ParticipantModel { get; set; }
    }
}
