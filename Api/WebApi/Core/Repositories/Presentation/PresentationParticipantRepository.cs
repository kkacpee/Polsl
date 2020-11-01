namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Presentation;
    using Persistence;
    using Persistence.Models;

    public class PresentationParticipantRepository : GenericRepository<PresentationParticipant>, IPresentationParticipantRepository
    {
        public PresentationParticipantRepository(ApiDbContext context) : base(context) { }
    }
}
