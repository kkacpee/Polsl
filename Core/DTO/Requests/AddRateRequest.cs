namespace Core.DTO.Requests
{
    public class AddRateRequest
    {
        public string Description { get; set; }
        public int Value { get; set; }
        public int? ConferenceID { get; set; }
        public int? PresentationID { get; set; }
        public int UserID { get; set; }
        public int RateCriterionID { get; set; }
    }
}
