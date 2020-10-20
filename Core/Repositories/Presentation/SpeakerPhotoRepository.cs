namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Presentation;
    using Persistence;
    using Persistence.Models;

    public class SpeakerPhotoRepository : GenericRepository<SpeakerPhoto>, ISpeakerPhotoRepository
    {
        public SpeakerPhotoRepository(ApiDbContext context) : base(context) { }
    }
}
