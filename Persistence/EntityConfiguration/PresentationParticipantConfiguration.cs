using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class PresentationParticipantConfiguration : IEntityTypeConfiguration<PresentationParticipant>
    {
        public void Configure(EntityTypeBuilder<PresentationParticipant> builder)
        {
            builder.HasKey(x => x.ID);
            builder.HasOne(x => x.Presentation)
                .WithMany(x => x.PresentationParticipants)
                .HasForeignKey(x => x.PresentationID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.Participant)
                .WithMany(x => x.PresentationParticipants)
                .HasForeignKey(x => x.ParticipantID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}