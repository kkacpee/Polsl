using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class ConferencePointOfInterestConfiguration : IEntityTypeConfiguration<ConferencePointOfInterest>
    {
        public void Configure(EntityTypeBuilder<ConferencePointOfInterest> builder)
        {
            builder.HasKey(x => x.ID);
            builder.HasOne(x => x.Conference)
                .WithMany(x => x.ConferencePointOfInterests)
                .HasForeignKey(x => x.ConferenceID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.PointOfInterest)
                .WithMany(x => x.ConferencePointOfInterests)
                .HasForeignKey(x => x.PointOfInterestID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}