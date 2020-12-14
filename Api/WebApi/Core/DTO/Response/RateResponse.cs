using Core.Models;

namespace Core.DTO.Response
{
    public class RateResponse
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public int Value { get; set; }
        public int MobileUserID { get; set; }
        public int RateCriterionID { get; set; }
        public string RateCriterionName { get; set; }
        public int? ConferenceID { get; set; }
        public string ConferenceName { get; set; }
        public int? PresentationID { get; set; }
        public string PresentationName { get; set; }
    }
}
