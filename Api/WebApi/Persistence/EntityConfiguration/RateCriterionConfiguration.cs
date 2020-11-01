using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class RateCriterionConfiguration : IEntityTypeConfiguration<RateCriterion>
    {
        public void Configure(EntityTypeBuilder<RateCriterion> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Name)
                .HasMaxLength(256);
            builder.HasOne(x => x.RateCriterionType)
                .WithMany(x => x.RateCriterions)
                .HasForeignKey(x => x.RateCriterionTypeID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}