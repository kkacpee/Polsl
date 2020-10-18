using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class OrganizerConfiguration : IEntityTypeConfiguration<Organizer>
    {
        public void Configure(EntityTypeBuilder<Organizer> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Company)
                   .HasMaxLength(128);
            builder.Property(x => x.Contact)
                   .HasMaxLength(256);
            builder.Property(x => x.FirstName)
                   .HasMaxLength(64);
            builder.Property(x => x.LastName)
                   .HasMaxLength(64);
            builder.Property(x => x.University)
                   .HasMaxLength(128);
        }
    }
}
