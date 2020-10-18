using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class SpeakerPhotoConfiguration : IEntityTypeConfiguration<SpeakerPhoto>
    {
        public void Configure(EntityTypeBuilder<SpeakerPhoto> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Path)
                .HasMaxLength(128);
            builder.HasOne(x => x.Speaker)
                .WithMany(x => x.SpeakerPhotos)
                .HasForeignKey(x => x.SpeakerID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

