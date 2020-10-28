using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class ParticipantConfiguration : IEntityTypeConfiguration<Participant>
    {
        public void Configure(EntityTypeBuilder<Participant> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Company)
                .HasMaxLength(128);
            builder.Property(x => x.Affiliation)
                .HasMaxLength(128);
            builder.Property(x => x.Country)
                .HasMaxLength(32);
            builder.Property(x => x.Description)
                .HasMaxLength(256);
            builder.Property(x => x.FirstName)
                .HasMaxLength(32);
            builder.Property(x => x.LastName)
                .HasMaxLength(32);
        }
    }
}