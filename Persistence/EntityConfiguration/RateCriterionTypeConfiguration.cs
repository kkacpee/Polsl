using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class RateCriterionTypeConfiguration : IEntityTypeConfiguration<RateCriterionType>
    {
        public void Configure(EntityTypeBuilder<RateCriterionType> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Name)
                .HasMaxLength(256);
        }
    }
}