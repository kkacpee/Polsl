using Persistence;
using System;

namespace Core.Repositories
{
    public class BaseRepository
    {
        protected readonly ApiDbContext _context;

        public BaseRepository(ApiDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
    }
}
