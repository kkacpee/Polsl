namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class ConferenceAccommodationRepository : GenericRepository<ConferenceAccommodation>, IConferenceAccommodationRepository
    {
        public ConferenceAccommodationRepository(ApiDbContext context) : base(context) { }
    }
}
