namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class OrganizerRepository : GenericRepository<Organizer>, IOrganizerRepository
    {
        public OrganizerRepository(ApiDbContext context) : base(context) { }
    }
}
