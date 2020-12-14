namespace Core.Models
{
    public class PresentationPhotoModel
    {
        public int ID { get; set; }
        public string Path { get; set; }
        public int PresentationID { get; set; }
        public bool IsMain { get; set; }
    }
}
