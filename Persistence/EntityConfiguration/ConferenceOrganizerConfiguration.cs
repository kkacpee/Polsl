using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class ConferenceOrganizerConfiguration : IEntityTypeConfiguration<Conference>
    {
        public void Configure(EntityTypeBuilder<Conference> builder)
        {
            builder.HasKey(x => x.ID);
            builder.HasOne(x => x.Conference)
                    .WithMany(x => x.ConferenceOrganizers)
                    .HasForeignKey(x => x.ConferenceID)
                    .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.Organizer)
                    .WithMany(x => x.ConferenceOrganizers)
                    .HasForeignKey(x => x.OrganizerID)
                    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
