namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Presentation;
    using Persistence;
    using Persistence.Models;

    public class PresentationTypeRepository : GenericRepository<PresentationType>, IPresentationTypeRepository
    {
        public PresentationTypeRepository(ApiDbContext context) : base(context) { }
    }
}
