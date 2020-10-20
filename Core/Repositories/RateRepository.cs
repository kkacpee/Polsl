namespace Core.Repositories
{
    using Core.Interfaces.Repositories;
    using Persistence;
    using Persistence.Models;

    public class RateRepository : GenericRepository<Rate>, IRateRepository
    {
        public RateRepository(ApiDbContext context) : base(context) { }
    }
}
