namespace Core.Repositories
{
    using Core.Interfaces.Repositories;
    using Persistence;
    using Persistence.Models;

    public class MessageRepository : GenericRepository<Message>, IMessageRepository
    {
        public MessageRepository(ApiDbContext context) : base(context) { }
    }
}
