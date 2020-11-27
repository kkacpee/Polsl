namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class PointOfInterestIconRepository : GenericRepository<PointOfInterestIcon>, IPointOfInterestIconRepository
    { 
        public PointOfInterestIconRepository(ApiDbContext context) : base(context) { }
    }
}
