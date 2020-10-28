using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models
{
    public class PresentationParticipantModel
    {
        public int ID { get; set; }
        public int PresentationID { get; set; }
        public int ParticipantID { get; set; }

        public virtual PresentationModel PresentationModel { get; set; }
        public virtual ParticipantModel ParticipantModel { get; set; }
    }
}
