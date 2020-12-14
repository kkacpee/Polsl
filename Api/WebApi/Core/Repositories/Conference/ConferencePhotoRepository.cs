namespace Core.Repositories.Conference
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class ConferencePhotoRepository : GenericRepository<ConferencePhoto>, IConferencePhotoRepository
    {
        public ConferencePhotoRepository(ApiDbContext context) : base(context) { }
    }
}
