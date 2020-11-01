namespace Persistence.Models
{
    public class ConferenceOrganizer
    {
        public int ID { get; set; }
        public int ConferenceID { get; set; }
        public int OrganizerID { get; set; }

        public virtual Conference Conference { get; set; }
        public virtual Organizer Organizer { get; set; }
    }
}
