namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class ConferencePointOfInterestRepository : GenericRepository<ConferencePointOfInterest>, IConferencePointOfInterestRepository
    {
        public ConferencePointOfInterestRepository(ApiDbContext context) : base(context) { }
    }
}
