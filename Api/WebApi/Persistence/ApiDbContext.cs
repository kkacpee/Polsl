﻿using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Persistence.Models;
using Microsoft.AspNetCore.Identity;
using System;

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
        public DbSet<Participant> Participants { get; set; }
        public DbSet<ParticipantPhoto> ParticipantPhotos { get; set; }
        public DbSet<Sponsor> Sponsors { get; set; }
        public DbSet<User> Users { get; set; }

        public ApiDbContext()
        {
        }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            var hasher = new PasswordHasher<User>();

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    UserName = "admin",
                    NormalizedUserName = "ADMIN",
                    Email = "admin@admin.com",
                    NormalizedEmail = "ADMIN@ADMIN.COM",
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    PasswordHash = hasher.HashPassword(null, "admin")
                }
            );
        }
    }
}
