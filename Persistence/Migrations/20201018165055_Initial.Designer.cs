﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    [Migration("20201018165055_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Persistence.Models.Accommodation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address")
                        .HasColumnType("character varying(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.Property<string>("Number")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.HasKey("ID");

                    b.ToTable("Accommodations");
                });

            modelBuilder.Entity("Persistence.Models.BuildingPlan", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ConferenceID")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.Property<string>("Name")
                        .HasColumnType("character varying(64)")
                        .HasMaxLength(64);

                    b.Property<string>("Path")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.HasKey("ID");

                    b.HasIndex("ConferenceID");

                    b.ToTable("BuildingPlans");
                });

            modelBuilder.Entity("Persistence.Models.Conference", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address")
                        .HasColumnType("character varying(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Country")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.Property<string>("Description")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Title")
                        .HasColumnType("character varying(64)")
                        .HasMaxLength(64);

                    b.Property<string>("YouTubeLink")
                        .HasColumnType("character varying(128)")
                        .HasMaxLength(128);

                    b.HasKey("ID");

                    b.ToTable("Conferences");
                });

            modelBuilder.Entity("Persistence.Models.ConferenceAccommodation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("AccommodationID")
                        .HasColumnType("integer");

                    b.Property<int>("ConferenceID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("AccommodationID");

                    b.HasIndex("ConferenceID");

                    b.ToTable("ConferenceAccommodations");
                });

            modelBuilder.Entity("Persistence.Models.ConferenceEmergencyNumber", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ConferenceID")
                        .HasColumnType("integer");

                    b.Property<int>("EmergencyNumberID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("ConferenceID");

                    b.HasIndex("EmergencyNumberID");

                    b.ToTable("ConferenceEmergencyNumbers");
                });

            modelBuilder.Entity("Persistence.Models.ConferencePointOfInterest", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ConferenceID")
                        .HasColumnType("integer");

                    b.Property<int>("PointOfInterestID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("ConferenceID");

                    b.HasIndex("PointOfInterestID");

                    b.ToTable("ConferencePointsOfInterest");
                });

            modelBuilder.Entity("Persistence.Models.ConferenceSponsor", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ConferenceID")
                        .HasColumnType("integer");

                    b.Property<int>("SponsorID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("ConferenceID");

                    b.HasIndex("SponsorID");

                    b.ToTable("ConferenceSponsors");
                });

            modelBuilder.Entity("Persistence.Models.EmergencyNumber", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.Property<string>("Number")
                        .HasColumnType("character varying(16)")
                        .HasMaxLength(16);

                    b.HasKey("ID");

                    b.ToTable("EmergencyNumbers");
                });

            modelBuilder.Entity("Persistence.Models.PointOfInterest", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address")
                        .HasColumnType("character varying(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Contact")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.Property<string>("Name")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.Property<int>("PointOfInterestTypeID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("PointOfInterestTypeID");

                    b.ToTable("PointsOfInterest");
                });

            modelBuilder.Entity("Persistence.Models.PointOfInterestType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Name")
                        .HasColumnType("integer")
                        .HasMaxLength(32);

                    b.HasKey("ID");

                    b.ToTable("PointOfInterestTypes");
                });

            modelBuilder.Entity("Persistence.Models.Presentation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ConferenceID")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Place")
                        .HasColumnType("character varying(128)")
                        .HasMaxLength(128);

                    b.Property<int>("PresentationTypeID")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Title")
                        .HasColumnType("character varying(1024)")
                        .HasMaxLength(1024);

                    b.HasKey("ID");

                    b.HasIndex("ConferenceID");

                    b.HasIndex("PresentationTypeID");

                    b.ToTable("Presentations");
                });

            modelBuilder.Entity("Persistence.Models.PresentationSpeaker", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("PresentationID")
                        .HasColumnType("integer");

                    b.Property<int>("SpeakerID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("PresentationID");

                    b.HasIndex("SpeakerID");

                    b.ToTable("PresentationSpeakers");
                });

            modelBuilder.Entity("Persistence.Models.PresentationType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.Property<string>("Name")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.HasKey("ID");

                    b.ToTable("PresentationTypes");
                });

            modelBuilder.Entity("Persistence.Models.Rate", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ConferenceID")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("character varying(512)")
                        .HasMaxLength(512);

                    b.Property<int>("PresentationID")
                        .HasColumnType("integer");

                    b.Property<int>("RateCriterionID")
                        .HasColumnType("integer");

                    b.Property<int>("UserID")
                        .HasColumnType("integer");

                    b.Property<int>("Value")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("ConferenceID");

                    b.HasIndex("PresentationID");

                    b.HasIndex("RateCriterionID");

                    b.HasIndex("UserID");

                    b.ToTable("Rates");
                });

            modelBuilder.Entity("Persistence.Models.RateCriterion", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.Property<int>("RateCriterionTypeID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("RateCriterionTypeID");

                    b.ToTable("RateCriteria");
                });

            modelBuilder.Entity("Persistence.Models.RateCriterionType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.HasKey("ID");

                    b.ToTable("RateCriterionTypes");
                });

            modelBuilder.Entity("Persistence.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("NormalizedName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Persistence.Models.Speaker", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Company")
                        .HasColumnType("character varying(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Country")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.Property<string>("Description")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.Property<string>("FirstName")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.Property<string>("LastName")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.HasKey("ID");

                    b.ToTable("Speakers");
                });

            modelBuilder.Entity("Persistence.Models.SpeakerPhoto", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Path")
                        .HasColumnType("character varying(128)")
                        .HasMaxLength(128);

                    b.Property<int>("SpeakerID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("SpeakerID");

                    b.ToTable("SpeakerPhotos");
                });

            modelBuilder.Entity("Persistence.Models.Sponsor", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address")
                        .HasColumnType("character varying(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Country")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.Property<string>("Description")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.Property<string>("LogoPath")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.Property<string>("Name")
                        .HasColumnType("character varying(32)")
                        .HasMaxLength(32);

                    b.Property<string>("Number")
                        .HasColumnType("character varying(16)")
                        .HasMaxLength(16);

                    b.Property<string>("Website")
                        .HasColumnType("character varying(256)")
                        .HasMaxLength(256);

                    b.HasKey("ID");

                    b.ToTable("Sponsors");
                });

            modelBuilder.Entity("Persistence.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("text");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Persistence.Models.BuildingPlan", b =>
                {
                    b.HasOne("Persistence.Models.Conference", "Conference")
                        .WithMany("BuildingPlans")
                        .HasForeignKey("ConferenceID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.ConferenceAccommodation", b =>
                {
                    b.HasOne("Persistence.Models.Accommodation", "Accommodation")
                        .WithMany("ConferenceAccommodations")
                        .HasForeignKey("AccommodationID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Persistence.Models.Conference", "Conference")
                        .WithMany("ConferenceAccommodations")
                        .HasForeignKey("ConferenceID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.ConferenceEmergencyNumber", b =>
                {
                    b.HasOne("Persistence.Models.Conference", "Conference")
                        .WithMany("ConferenceEmergencyNumbers")
                        .HasForeignKey("ConferenceID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Persistence.Models.EmergencyNumber", "EmergencyNumber")
                        .WithMany("ConferenceEmergencyNumbers")
                        .HasForeignKey("EmergencyNumberID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.ConferencePointOfInterest", b =>
                {
                    b.HasOne("Persistence.Models.Conference", "Conference")
                        .WithMany("ConferencePointOfInterests")
                        .HasForeignKey("ConferenceID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Persistence.Models.PointOfInterest", "PointOfInterest")
                        .WithMany("ConferencePointOfInterests")
                        .HasForeignKey("PointOfInterestID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.ConferenceSponsor", b =>
                {
                    b.HasOne("Persistence.Models.Conference", "Conference")
                        .WithMany("ConferenceSponsors")
                        .HasForeignKey("ConferenceID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Persistence.Models.Sponsor", "Sponsor")
                        .WithMany("ConferenceSponsors")
                        .HasForeignKey("SponsorID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.PointOfInterest", b =>
                {
                    b.HasOne("Persistence.Models.PointOfInterestType", "PointOfInterestType")
                        .WithMany("PointsOfInterest")
                        .HasForeignKey("PointOfInterestTypeID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.Presentation", b =>
                {
                    b.HasOne("Persistence.Models.Conference", "Conference")
                        .WithMany("Presentations")
                        .HasForeignKey("ConferenceID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Persistence.Models.PresentationType", "PresentationType")
                        .WithMany("Presentations")
                        .HasForeignKey("PresentationTypeID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.PresentationSpeaker", b =>
                {
                    b.HasOne("Persistence.Models.Presentation", "Presentation")
                        .WithMany("PresentationSpeakers")
                        .HasForeignKey("PresentationID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Persistence.Models.Speaker", "Speaker")
                        .WithMany("PresentationSpeakers")
                        .HasForeignKey("SpeakerID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.Rate", b =>
                {
                    b.HasOne("Persistence.Models.Conference", "Conference")
                        .WithMany("Rates")
                        .HasForeignKey("ConferenceID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Persistence.Models.Presentation", "Presentation")
                        .WithMany("Rates")
                        .HasForeignKey("PresentationID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Persistence.Models.RateCriterion", "RateCriterion")
                        .WithMany("Rates")
                        .HasForeignKey("RateCriterionID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Persistence.Models.User", "User")
                        .WithMany("Rates")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.RateCriterion", b =>
                {
                    b.HasOne("Persistence.Models.RateCriterionType", "RateCriterionType")
                        .WithMany("RateCriterions")
                        .HasForeignKey("RateCriterionTypeID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Persistence.Models.SpeakerPhoto", b =>
                {
                    b.HasOne("Persistence.Models.Speaker", "Speaker")
                        .WithMany("SpeakerPhotos")
                        .HasForeignKey("SpeakerID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
