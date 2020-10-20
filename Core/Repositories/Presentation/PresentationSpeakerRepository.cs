namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Presentation;
    using Persistence;
    using Persistence.Models;

    public class PresentationSpeakerRepository : GenericRepository<PresentationSpeaker>, IPresentationSpeakerRepository
    {
        public PresentationSpeakerRepository(ApiDbContext context) : base(context) { }
    }
}
