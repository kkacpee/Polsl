using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class PresentationConfiguration : IEntityTypeConfiguration<Presentation>
    {
        public void Configure(EntityTypeBuilder<Presentation> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.StartDate);
            builder.Property(x => x.EndDate);
            builder.Property(x => x.Place)
                .HasMaxLength(128);
            builder.Property(x => x.Authors)
                .HasMaxLength(128);
            builder.Property(x => x.Description)
                .HasMaxLength(256);
            builder.Property(x => x.Title)
                .HasMaxLength(1024);
            builder.HasOne(x => x.Conference)
                .WithMany(x => x.Presentations)
                .HasForeignKey(x => x.ConferenceID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.PresentationType)
               .WithMany(x => x.Presentations)
               .HasForeignKey(x => x.PresentationTypeID)
               .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
