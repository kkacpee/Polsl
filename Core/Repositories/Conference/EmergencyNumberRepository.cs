namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class EmergencyNumberRepository : GenericRepository<EmergencyNumber>, IEmergencyNumberRepository
    {
        public EmergencyNumberRepository(ApiDbContext context) : base(context) { }
    }
}
