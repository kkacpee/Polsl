namespace Core.Repositories
{
    using Core.Interfaces.Repositories;
    using Persistence;
    using Persistence.Models;

    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        public RoleRepository(ApiDbContext context) : base(context) { }
    }
}
