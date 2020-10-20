namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class ConferenceSponsorRepository : GenericRepository<ConferenceSponsor>, IConferenceSponsorRepository
    {
        public ConferenceSponsorRepository(ApiDbContext context) : base(context) { }
    }
}
