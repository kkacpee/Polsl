using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class PresentationSpeakerConfiguration : IEntityTypeConfiguration<PresentationSpeaker>
    {
        public void Configure(EntityTypeBuilder<PresentationSpeaker> builder)
        {
            builder.HasKey(x => x.ID);
            builder.HasOne(x => x.Presentation)
                .WithMany(x => x.PresentationSpeakers)
                .HasForeignKey(x => x.PresentationID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.Speaker)
                .WithMany(x => x.PresentationSpeakers)
                .HasForeignKey(x => x.SpeakerID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}