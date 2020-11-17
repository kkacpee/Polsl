namespace Persistence.Models
{
    public class PresentationPhoto
    {
        public int ID { get; set; }
        public string Path { get; set; }
        public int PresentationID { get; set; }
        public bool IsMain { get; set; }

        public virtual Presentation Presentation { get; set; }
    }
}
