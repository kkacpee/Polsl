namespace Core.DTO.Requests
{
    public class AddBuildingPlanRequest
    {
        public string Path { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public int ConferenceID { get; set; }
    }
}
