using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.EntityConfiguration
{
    public class ConferencePhotoConfiguration : IEntityTypeConfiguration<ConferencePhoto>
    {
        public void Configure(EntityTypeBuilder<ConferencePhoto> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Path)
                .HasMaxLength(128)
                .IsRequired(); ;
            builder.Property(x => x.IsMain)
                .IsRequired();
            builder.HasOne(x => x.Conference)
                .WithMany(x => x.ConferencePhotos)
                .HasForeignKey(x => x.ConferenceID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
