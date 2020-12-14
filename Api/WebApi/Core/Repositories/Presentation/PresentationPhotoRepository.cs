namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Presentation;
    using Persistence;
    using Persistence.Models;

    public class PresentationPhotoRepository : GenericRepository<PresentationPhoto>, IPresentationPhotoRepository
    {
        public PresentationPhotoRepository(ApiDbContext context) : base(context) { }
    }
}
