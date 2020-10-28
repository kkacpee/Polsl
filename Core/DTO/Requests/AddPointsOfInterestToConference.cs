using Core.Models;
using System.Collections.Generic;

namespace Core.DTO.Requests
{
    public class AddPointsOfInterestToConference
    {
        public int ConferenceID { get; set; }
        public List<PointOfInterestModel> PointsOfInterest { get; set; }
    }
}
