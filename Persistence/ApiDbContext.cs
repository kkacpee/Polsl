using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Persistence.Models;

namespace Persistence
{
    public class ApiDbContext : DbContext
    {
        public DbSet<Accommodation> Accommodations { get; set; }
        public DbSet<BuildingPlan> BuildingPlans { get; set; }
        public DbSet<Conference> Conferences { get; set; }
        public DbSet<ConferenceAccommodation> ConferenceAccommodations { get; set; }
        public DbSet<ConferenceEmergencyNumber> ConferenceEmergencyNumbers { get; set; }
        public DbSet<ConferencePointOfInterest> ConferencePointsOfInterest { get; set; }
        public DbSet<ConferenceSponsor> ConferenceSponsors { get; set; }
        public DbSet<EmergencyNumber> EmergencyNumbers { get; set; }
        public DbSet<PointOfInterest> PointsOfInterest { get; set; }
        public DbSet<PointOfInterestType> PointOfInterestTypes { get; set; }
        public DbSet<Presentation> Presentations { get; set; }
        public DbSet<PresentationParticipant> PresentationParticipants { get; set; }
        public DbSet<PresentationType> PresentationTypes { get; set; }
        public DbSet<Rate> Rates { get; set; }
        public DbSet<RateCriterion> RateCriteria { get; set; }
        public DbSet<RateCriterionType> RateCriterionTypes { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<ParticipantPhoto> ParticipantPhotos { get; set; }
        public DbSet<Sponsor> Sponsors { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"host=localhost;database=apidb;user id=postgres;password=admin");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
