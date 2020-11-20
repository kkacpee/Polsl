using Core.Models;
using System.Collections.Generic;

namespace Core.DTO.Requests
{
    public class PresentationParticipantRequest
    {
        public int PresentationID { get; set; }
        public List<int> ParticipantIDs { get; set; }
    }
}
