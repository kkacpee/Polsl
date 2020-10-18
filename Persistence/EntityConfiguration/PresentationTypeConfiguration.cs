using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class PresentationTypeConfiguration : IEntityTypeConfiguration<PresentationType>
    {
        public void Configure(EntityTypeBuilder<PresentationType> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Description)
                .HasMaxLength(256);
            builder.Property(x => x.Name)
                .HasMaxLength(32);
        }
    }
}