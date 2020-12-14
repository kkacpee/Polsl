namespace Core.Models
{
    public class ConferencePhotoModel
    {
        public int ID { get; set; }
        public string Path { get; set; }
        public int ConferenceID { get; set; }
        public bool IsMain { get; set; }
    }
}
