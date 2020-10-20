namespace Core.Repositories
{
    using Core.Interfaces.Repositories;
    using Persistence;
    using Persistence.Models;

    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ApiDbContext context) : base(context) { }
    }
}
