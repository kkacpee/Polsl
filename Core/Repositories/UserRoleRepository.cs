namespace Core.Repositories
{
    using Core.Interfaces.Repositories;
    using Persistence;
    using Persistence.Models;

    public class UserRoleRepository : GenericRepository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(ApiDbContext context) : base(context) { }
    }
}
