using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class RateConfiguration : IEntityTypeConfiguration<Rate>
    {
        public void Configure(EntityTypeBuilder<Rate> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Description)
                .HasMaxLength(512);
            builder.Property(x => x.Value).IsRequired();
            builder.Property(x => x.MobileUserID).IsRequired();
            builder.HasOne(x => x.Conference)
                .WithMany(x => x.Rates)
                .HasForeignKey(x => x.ConferenceID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.Presentation)
                .WithMany(x => x.Rates)
                .HasForeignKey(x => x.PresentationID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.RateCriterion)
                .WithMany(x => x.Rates)
                .HasForeignKey(x => x.RateCriterionID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}