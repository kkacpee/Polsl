using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class PointOfInterestTypeConfiguration : IEntityTypeConfiguration<PointOfInterestType>
    {
        public void Configure(EntityTypeBuilder<PointOfInterestType> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Name)
                .HasMaxLength(32);
            builder.HasOne(x => x.PointOfInterestIcon)
                .WithMany(x => x.PointOfInterestTypes)
                .HasForeignKey(x => x.PointOfInterestIconID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}