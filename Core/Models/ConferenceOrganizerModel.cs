namespace Core.Models
{
    public class ConferenceOrganizerModel
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int OrganizerID { get; set; }

        public virtual ConferenceModel ConferenceModel { get; set; }
        public virtual OrganizerModel OrganizerModel { get; set; }
    }
}
