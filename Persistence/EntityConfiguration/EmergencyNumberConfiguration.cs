using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class EmergencyNumberConfiguration : IEntityTypeConfiguration<EmergencyNumber>
    {
        public void Configure(EntityTypeBuilder<EmergencyNumber> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Name)
                .HasMaxLength(32);
            builder.Property(x => x.Number)
                .HasMaxLength(16);
        }
    }
}