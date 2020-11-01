namespace Core.DTO.Requests
{
    public class AddPointOfInterestRequest
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string Description { get; set; }
        public int PointOfInterestTypeID { get; set; }
    }
}
