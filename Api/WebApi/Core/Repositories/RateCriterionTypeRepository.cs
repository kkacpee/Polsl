namespace Core.Repositories
{
    using Core.Interfaces.Repositories;
    using Persistence;
    using Persistence.Models;

    public class RateCriterionTypeRepository : GenericRepository<RateCriterionType>, IRateCriterionTypeRepository
    {
        public RateCriterionTypeRepository(ApiDbContext context) : base(context) { }
    }
}
