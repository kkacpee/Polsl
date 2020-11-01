namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class ConferenceOrganizerRepository : GenericRepository<ConferenceOrganizer>, IConferenceOrganizerRepository
    {
        public ConferenceOrganizerRepository(ApiDbContext context) : base(context) { }
    }
}
