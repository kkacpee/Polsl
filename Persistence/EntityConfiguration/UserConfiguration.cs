using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Ignore(x => x.LockoutEnabled);
            builder.Ignore(x => x.LockoutEnd);
            builder.Ignore(x => x.PhoneNumber);
            builder.Ignore(x => x.PhoneNumberConfirmed);
            builder.Ignore(x => x.TwoFactorEnabled);
            builder.Ignore(x => x.AccessFailedCount);
        }
    }
}
