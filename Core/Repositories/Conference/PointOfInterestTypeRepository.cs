namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class PointOfInterestTypeRepository : GenericRepository<PointOfInterestType>, IPointOfInterestTypeRepository
    {
        public PointOfInterestTypeRepository(ApiDbContext context) : base(context) { }
    }
}
