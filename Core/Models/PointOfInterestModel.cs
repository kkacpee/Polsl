namespace Core.Models
{
    public class PointOfInterestModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string Description { get; set; }
        public int PointOfInterestTypeID { get; set; }

        public virtual PointOfInterestTypeModel PointOfInterestTypeModel { get; set; }
    }
}
