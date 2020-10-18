using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;

namespace Persistence.Persistence.EntityConfiguration
{
    public class ConferenceEmergencyNumberConfiguration : IEntityTypeConfiguration<ConferenceEmergencyNumber>
    {
        public void Configure(EntityTypeBuilder<ConferenceEmergencyNumber> builder)
        {
            builder.HasKey(x => x.ID);
            builder.HasOne(x => x.Conference)
                .WithMany(x => x.ConferenceEmergencyNumbers)
                .HasForeignKey(x => x.ConferenceID)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.EmergencyNumber)
                .WithMany(x => x.ConferenceEmergencyNumbers)
                .HasForeignKey(x => x.EmergencyNumberID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
