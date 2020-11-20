using System.Collections.Generic;

namespace Core.DTO.Requests
{
    public class ConferenceAccommodationRequest
    {
        public int ConferenceID { get; set; }
        public List<int> AccommodationIDs { get; set; }
    }
}
