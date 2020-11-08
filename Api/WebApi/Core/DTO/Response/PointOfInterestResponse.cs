using Core.Models;

namespace Core.DTO.Response
{
    public class PointOfInterestResponse
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string Description { get; set; }
        public int PointOfInterestTypeID { get; set; }
        public string PointOfInterestTypeName { get; set; }

        public virtual PointOfInterestTypeModel PointOfInterestType { get; set; }
    }
}
