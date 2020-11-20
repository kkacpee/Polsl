using Core.Models;
using System.Collections.Generic;

namespace Core.DTO.Requests
{
    public class ConferenceEmergencyNumberRequest
    {
        public int ConferenceID { get; set; }
        public List<int> EmergencyNumberIDs { get; set; }
    }
}
