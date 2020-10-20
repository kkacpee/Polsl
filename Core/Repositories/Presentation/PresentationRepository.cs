namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Presentation;
    using Persistence;
    using Persistence.Models;

    public class PresentationRepository : GenericRepository<Presentation>, IPresentationSpeakerRepository
    {
        public PresentationRepository(ApiDbContext context) : base(context) { }
    }
}
