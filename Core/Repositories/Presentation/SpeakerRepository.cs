namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Presentation;
    using Persistence;
    using Persistence.Models;

    public class SpeakerRepository : GenericRepository<Speaker>, ISpeakerRepository
    {
        public SpeakerRepository(ApiDbContext context) : base(context) { }
    }
}
