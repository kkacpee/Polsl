using System;
using System.Collections.Generic;

namespace Persistence.Models
{
    public class Presentation
    {
        public int ID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Place { get; set; }
        public string Authors { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public int ConferenceID { get; set; }
        public int PresentationTypeID { get; set; }

        public Conference Conference { get; set; }
        public PresentationType PresentationType { get; set; }
        public virtual ICollection<PresentationParticipant> PresentationParticipants { get; set; }
        public virtual ICollection<Rate> Rates { get; set; }

    }
}
