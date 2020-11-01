using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class ConferenceConfiguration : IEntityTypeConfiguration<Conference>
    {
        public void Configure(EntityTypeBuilder<Conference> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Address)
                .HasMaxLength(128);
            builder.Property(x => x.Country)
                .HasMaxLength(32);
            builder.Property(x => x.Description)
                .HasMaxLength(256);
            builder.Property(x => x.StartDate);
            builder.Property(x => x.EndDate);
            builder.Property(x => x.Title)
                .HasMaxLength(64);
            builder.Property(x => x.SocialMedia)
                .HasMaxLength(256);  
        }
    }
}
