namespace Core.Models
{
    public class RateCriterionModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int RateCriterionTypeID { get; set; }

        public RateCriterionTypeModel RateCriterionTypeModel { get; set; }
    }
}
