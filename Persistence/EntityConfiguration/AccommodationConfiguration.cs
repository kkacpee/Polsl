using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class AccommodationConfiguration : IEntityTypeConfiguration<Accommodation>
    {
        public void Configure(EntityTypeBuilder<Accommodation> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Address)
                    .HasMaxLength(128);
            builder.Property(x => x.Name)
                   .HasMaxLength(32);
            builder.Property(x => x.Number)
                   .HasMaxLength(32);
        }
    }
}
