namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Presentation;
    using Persistence;
    using Persistence.Models;

    public class ParticipantPhotoRepository : GenericRepository<ParticipantPhoto>, IParticipantPhotoRepository
    {
        public ParticipantPhotoRepository(ApiDbContext context) : base(context) { }
    }
}
