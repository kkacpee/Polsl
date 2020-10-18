using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class ConferenceAccommodationConfiguration : IEntityTypeConfiguration<ConferenceAccommodation>
    {
        public void Configure(EntityTypeBuilder<ConferenceAccommodation> builder)
        {
            builder.HasKey(x => x.ID);
            builder.HasOne(x => x.Conference)
                .WithMany(x => x.ConferenceAccommodations)
                .HasForeignKey(x => x.ConferenceID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.Accommodation)
                .WithMany(x => x.ConferenceAccommodations)
                .HasForeignKey(x => x.AccommodationID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
