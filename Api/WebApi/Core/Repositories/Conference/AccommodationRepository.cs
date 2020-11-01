namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class AccommodationRepository : GenericRepository<Accommodation>, IAccommodationRepository
    {
        public AccommodationRepository(ApiDbContext context) : base(context) { }
    }
}
