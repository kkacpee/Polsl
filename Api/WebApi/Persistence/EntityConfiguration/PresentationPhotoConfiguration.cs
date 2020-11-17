using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.EntityConfiguration
{
    public class PresentationPhotoConfiguration : IEntityTypeConfiguration<PresentationPhoto>
    {
        public void Configure(EntityTypeBuilder<PresentationPhoto> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Path)
                .HasMaxLength(128)
                .IsRequired(); ;
            builder.Property(x => x.IsMain)
                .IsRequired();
            builder.HasOne(x => x.Presentation)
                .WithMany(x => x.PresentationPhotos)
                .HasForeignKey(x => x.PresentationID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
