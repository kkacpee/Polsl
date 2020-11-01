namespace Core.Models
{
    public class BuildingPlanModel
    {
        public int ID { get; set; }
        public string Path { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public int ConferenceID { get; set; }

        public virtual ConferenceModel ConferenceModel { get; set; }
    }
}
