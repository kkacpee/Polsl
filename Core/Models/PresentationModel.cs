using System;
using System.Collections.Generic;

namespace Core.Models
{
    public class PresentationModel
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

        public ConferenceModel Conference { get; set; }
        public PresentationTypeModel PresentationType { get; set; }
        public virtual ICollection<PresentationParticipantModel> PresentationParticipants { get; set; }
        public virtual ICollection<RateModel> Rates{ get; set; }
    }
}
