namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class ConferenceRepository : GenericRepository<Conference>, IConferenceRepository
    {
        public ConferenceRepository(ApiDbContext context) : base(context) { }
    }
}
