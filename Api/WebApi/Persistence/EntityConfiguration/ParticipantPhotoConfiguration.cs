using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class ParticipantPhotoConfiguration : IEntityTypeConfiguration<ParticipantPhoto>
    {
        public void Configure(EntityTypeBuilder<ParticipantPhoto> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Path)
                .HasMaxLength(128);
            builder.HasOne(x => x.Participant)
                .WithOne(x => x.ParticipantPhoto)
                .HasForeignKey<ParticipantPhoto>(x => x.ParticipantID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

