using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class SponsorConfiguration : IEntityTypeConfiguration<Sponsor>
    {
        public void Configure(EntityTypeBuilder<Sponsor> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Country)
                .HasMaxLength(32);
            builder.Property(x => x.Description)
                .HasMaxLength(256);
            builder.Property(x => x.LogoPath)
                .HasMaxLength(256);
            builder.Property(x => x.Name)
                .HasMaxLength(32);
            builder.Property(x => x.Website)
                .HasMaxLength(256);
        }
    }
}
