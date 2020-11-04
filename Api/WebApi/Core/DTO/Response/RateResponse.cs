namespace Core.DTO.Response
{
    public class RateResponse
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public int Value { get; set; }
        public int UserID { get; set; }
        public int RateCriterionID { get; set; }
    }
}
