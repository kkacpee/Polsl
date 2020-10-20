namespace Core.Repositories
{
    using Core.Interfaces.Repositories;
    using Persistence;
    using Persistence.Models;

    public class RateCriterionRepository : GenericRepository<RateCriterion>, IRateCriterionRepository
    {
        public RateCriterionRepository(ApiDbContext context) : base(context) { }
    }
}
