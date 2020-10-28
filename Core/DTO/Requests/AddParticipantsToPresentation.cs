using Core.Models;
using System.Collections.Generic;

namespace Core.DTO.Requests
{
    public class AddParticipantsToPresentation
    {
        public int PresentationID { get; set; }
        public List<ParticipantModel> Participants { get; set; }
    }
}
