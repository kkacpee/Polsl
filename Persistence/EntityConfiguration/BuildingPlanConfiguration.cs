using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class BuildingPlanConfiguration : IEntityTypeConfiguration<BuildingPlan>
    {
        public void Configure(EntityTypeBuilder<BuildingPlan> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Path)
                   .HasMaxLength(256);
            builder.Property(x => x.Description)
                   .HasMaxLength(256);
            builder.Property(x => x.Name)
                   .HasMaxLength(64);
            builder.HasOne(x => x.Conference)
                    .WithMany(x => x.BuildingPlans)
                    .HasForeignKey(x => x.ConferenceID)
                    .OnDelete(DeleteBehavior.Restrict);                  
        }
    }
}
