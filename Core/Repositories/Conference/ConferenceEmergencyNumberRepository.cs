namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class ConferenceEmergencyNumberRepository : GenericRepository<ConferenceEmergencyNumber>, IConferenceEmergencyNumberRepository
    {
        public ConferenceEmergencyNumberRepository(ApiDbContext context) : base(context) { }
    }
}
