namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class PointOfInterestRepository : GenericRepository<PointOfInterest>, IPointOfInterestRepository
    {
        public PointOfInterestRepository(ApiDbContext context) : base(context) { }
    }
}
