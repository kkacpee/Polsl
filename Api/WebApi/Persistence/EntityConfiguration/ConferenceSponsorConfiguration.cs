using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    class ConferenceSponsorConfiguration : IEntityTypeConfiguration<ConferenceSponsor>
    {
        public void Configure(EntityTypeBuilder<ConferenceSponsor> builder)
        {
            builder.HasKey(x => x.ID);
            builder.HasOne(x => x.Conference)
                .WithMany(x => x.ConferenceSponsors)
                .HasForeignKey(x => x.ConferenceID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.Sponsor)
                .WithMany(x => x.ConferenceSponsors)
                .HasForeignKey(x => x.SponsorID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
