using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.EntityConfiguration
{
    public class PointOfInterestIconConfiguration : IEntityTypeConfiguration<PointOfInterestIcon>
    {
        public void Configure(EntityTypeBuilder<PointOfInterestIcon> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.XmlContent);
            builder.Property(c => c.XmlContent).HasColumnType("xml");
            builder.Ignore(c => c.XmlValueWrapper);
        }
    }
}
