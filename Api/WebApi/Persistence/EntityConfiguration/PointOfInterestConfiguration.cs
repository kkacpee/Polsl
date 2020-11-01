using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class PointOfInterestConfiguration : IEntityTypeConfiguration<PointOfInterest>
    {
        public void Configure(EntityTypeBuilder<PointOfInterest> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Name)
                .HasMaxLength(32);
            builder.Property(x => x.Address)
                .HasMaxLength(128);
            builder.Property(x => x.Contact)
                .HasMaxLength(32);
            builder.Property(x => x.Description)
                .HasMaxLength(512);
            builder.HasOne(x => x.PointOfInterestType)
                .WithMany(x => x.PointsOfInterest)
                .HasForeignKey(x => x.PointOfInterestTypeID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}