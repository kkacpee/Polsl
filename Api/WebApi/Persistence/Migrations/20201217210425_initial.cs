using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Persistence.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accommodations",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(maxLength: 128, nullable: true),
                    Name = table.Column<string>(maxLength: 32, nullable: true),
                    Number = table.Column<string>(maxLength: 32, nullable: true),
                    Website = table.Column<string>(maxLength: 128, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accommodations", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Conferences",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(maxLength: 128, nullable: true),
                    Country = table.Column<string>(maxLength: 32, nullable: true),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Title = table.Column<string>(maxLength: 64, nullable: true),
                    SocialMedia = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conferences", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "EmergencyNumbers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(maxLength: 32, nullable: true),
                    Number = table.Column<string>(maxLength: 16, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmergencyNumbers", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SentDate = table.Column<DateTime>(nullable: false),
                    MobileUserID = table.Column<int>(nullable: false),
                    Content = table.Column<string>(maxLength: 512, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Organizer",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(maxLength: 64, nullable: true),
                    LastName = table.Column<string>(maxLength: 64, nullable: true),
                    Affiliation = table.Column<string>(maxLength: 128, nullable: true),
                    Company = table.Column<string>(maxLength: 128, nullable: true),
                    Contact = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizer", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Participants",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Company = table.Column<string>(maxLength: 128, nullable: true),
                    Affiliation = table.Column<string>(maxLength: 128, nullable: true),
                    Country = table.Column<string>(maxLength: 32, nullable: true),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    FirstName = table.Column<string>(maxLength: 32, nullable: true),
                    LastName = table.Column<string>(maxLength: 32, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participants", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PointOfInterestIcon",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Path = table.Column<string>(maxLength: 512, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointOfInterestIcon", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PresentationTypes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    Name = table.Column<string>(maxLength: 32, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentationTypes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "RateCriterionTypes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RateCriterionTypes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sponsors",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Country = table.Column<string>(maxLength: 32, nullable: true),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    LogoPath = table.Column<string>(maxLength: 256, nullable: true),
                    Name = table.Column<string>(maxLength: 32, nullable: true),
                    Website = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sponsors", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(nullable: true),
                    NormalizedUserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    NormalizedEmail = table.Column<string>(nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BuildingPlans",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Path = table.Column<string>(maxLength: 256, nullable: true),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    Name = table.Column<string>(maxLength: 64, nullable: true),
                    ConferenceID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingPlans", x => x.ID);
                    table.ForeignKey(
                        name: "FK_BuildingPlans_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConferenceAccommodations",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConferenceID = table.Column<int>(nullable: false),
                    AccommodationID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConferenceAccommodations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConferenceAccommodations_Accommodations_AccommodationID",
                        column: x => x.AccommodationID,
                        principalTable: "Accommodations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConferenceAccommodations_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConferencePhoto",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Path = table.Column<string>(maxLength: 128, nullable: false),
                    ConferenceID = table.Column<int>(nullable: false),
                    IsMain = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConferencePhoto", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConferencePhoto_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConferenceEmergencyNumbers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConferenceID = table.Column<int>(nullable: false),
                    EmergencyNumberID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConferenceEmergencyNumbers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConferenceEmergencyNumbers_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConferenceEmergencyNumbers_EmergencyNumbers_EmergencyNumber~",
                        column: x => x.EmergencyNumberID,
                        principalTable: "EmergencyNumbers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConferenceOrganizer",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConferenceID = table.Column<int>(nullable: false),
                    OrganizerID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConferenceOrganizer", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConferenceOrganizer_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConferenceOrganizer_Organizer_OrganizerID",
                        column: x => x.OrganizerID,
                        principalTable: "Organizer",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ParticipantPhotos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Path = table.Column<string>(maxLength: 128, nullable: true),
                    ParticipantID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParticipantPhotos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ParticipantPhotos_Participants_ParticipantID",
                        column: x => x.ParticipantID,
                        principalTable: "Participants",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PointOfInterestTypes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(maxLength: 32, nullable: true),
                    PointOfInterestIconID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointOfInterestTypes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PointOfInterestTypes_PointOfInterestIcon_PointOfInterestIco~",
                        column: x => x.PointOfInterestIconID,
                        principalTable: "PointOfInterestIcon",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Presentations",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Place = table.Column<string>(maxLength: 128, nullable: true),
                    Authors = table.Column<string>(maxLength: 128, nullable: true),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    Title = table.Column<string>(maxLength: 1024, nullable: true),
                    ConferenceID = table.Column<int>(nullable: false),
                    PresentationTypeID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presentations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Presentations_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Presentations_PresentationTypes_PresentationTypeID",
                        column: x => x.PresentationTypeID,
                        principalTable: "PresentationTypes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RateCriteria",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    RateCriterionTypeID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RateCriteria", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RateCriteria_RateCriterionTypes_RateCriterionTypeID",
                        column: x => x.RateCriterionTypeID,
                        principalTable: "RateCriterionTypes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConferenceSponsors",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConferenceID = table.Column<int>(nullable: false),
                    SponsorID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConferenceSponsors", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConferenceSponsors_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConferenceSponsors_Sponsors_SponsorID",
                        column: x => x.SponsorID,
                        principalTable: "Sponsors",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PointsOfInterest",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(maxLength: 32, nullable: true),
                    Address = table.Column<string>(maxLength: 128, nullable: true),
                    Contact = table.Column<string>(maxLength: 32, nullable: true),
                    Description = table.Column<string>(maxLength: 512, nullable: true),
                    PointOfInterestTypeID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointsOfInterest", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PointsOfInterest_PointOfInterestTypes_PointOfInterestTypeID",
                        column: x => x.PointOfInterestTypeID,
                        principalTable: "PointOfInterestTypes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PresentationParticipants",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PresentationID = table.Column<int>(nullable: false),
                    ParticipantID = table.Column<int>(nullable: false),
                    IsAuthor = table.Column<bool>(nullable: false),
                    IsSpeaker = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentationParticipants", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PresentationParticipants_Participants_ParticipantID",
                        column: x => x.ParticipantID,
                        principalTable: "Participants",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PresentationParticipants_Presentations_PresentationID",
                        column: x => x.PresentationID,
                        principalTable: "Presentations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PresentationPhoto",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Path = table.Column<string>(maxLength: 128, nullable: false),
                    PresentationID = table.Column<int>(nullable: false),
                    IsMain = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentationPhoto", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PresentationPhoto_Presentations_PresentationID",
                        column: x => x.PresentationID,
                        principalTable: "Presentations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rates",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(maxLength: 512, nullable: true),
                    Value = table.Column<int>(nullable: false),
                    ConferenceID = table.Column<int>(nullable: true),
                    PresentationID = table.Column<int>(nullable: true),
                    MobileUserID = table.Column<int>(nullable: false),
                    RateCriterionID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rates", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Rates_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rates_Presentations_PresentationID",
                        column: x => x.PresentationID,
                        principalTable: "Presentations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rates_RateCriteria_RateCriterionID",
                        column: x => x.RateCriterionID,
                        principalTable: "RateCriteria",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConferencePointsOfInterest",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConferenceID = table.Column<int>(nullable: false),
                    PointOfInterestID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConferencePointsOfInterest", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConferencePointsOfInterest_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConferencePointsOfInterest_PointsOfInterest_PointOfInterest~",
                        column: x => x.PointOfInterestID,
                        principalTable: "PointsOfInterest",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "ConcurrencyStamp", "Email", "EmailConfirmed", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { 1, "0d24fcfe-5db9-4d78-a22d-1eb82f99ef6a", "admin@admin.com", false, "ADMIN@ADMIN.COM", "ADMIN", "AQAAAAEAACcQAAAAEFs5slr7ymXVepRXgRq4A1FpLmp3pngPtZ6qvV4QAlyVlHsy6iWs4IX9MpGP2G0drw==", "3d9b1c93-0e98-4a47-9e71-869bfd8d730a", "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_BuildingPlans_ConferenceID",
                table: "BuildingPlans",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceAccommodations_AccommodationID",
                table: "ConferenceAccommodations",
                column: "AccommodationID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceAccommodations_ConferenceID",
                table: "ConferenceAccommodations",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceEmergencyNumbers_ConferenceID",
                table: "ConferenceEmergencyNumbers",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceEmergencyNumbers_EmergencyNumberID",
                table: "ConferenceEmergencyNumbers",
                column: "EmergencyNumberID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceOrganizer_ConferenceID",
                table: "ConferenceOrganizer",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceOrganizer_OrganizerID",
                table: "ConferenceOrganizer",
                column: "OrganizerID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferencePhoto_ConferenceID",
                table: "ConferencePhoto",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferencePointsOfInterest_ConferenceID",
                table: "ConferencePointsOfInterest",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferencePointsOfInterest_PointOfInterestID",
                table: "ConferencePointsOfInterest",
                column: "PointOfInterestID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceSponsors_ConferenceID",
                table: "ConferenceSponsors",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceSponsors_SponsorID",
                table: "ConferenceSponsors",
                column: "SponsorID");

            migrationBuilder.CreateIndex(
                name: "IX_ParticipantPhotos_ParticipantID",
                table: "ParticipantPhotos",
                column: "ParticipantID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PointOfInterestTypes_PointOfInterestIconID",
                table: "PointOfInterestTypes",
                column: "PointOfInterestIconID");

            migrationBuilder.CreateIndex(
                name: "IX_PointsOfInterest_PointOfInterestTypeID",
                table: "PointsOfInterest",
                column: "PointOfInterestTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_PresentationParticipants_ParticipantID",
                table: "PresentationParticipants",
                column: "ParticipantID");

            migrationBuilder.CreateIndex(
                name: "IX_PresentationParticipants_PresentationID",
                table: "PresentationParticipants",
                column: "PresentationID");

            migrationBuilder.CreateIndex(
                name: "IX_PresentationPhoto_PresentationID",
                table: "PresentationPhoto",
                column: "PresentationID");

            migrationBuilder.CreateIndex(
                name: "IX_Presentations_ConferenceID",
                table: "Presentations",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_Presentations_PresentationTypeID",
                table: "Presentations",
                column: "PresentationTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_RateCriteria_RateCriterionTypeID",
                table: "RateCriteria",
                column: "RateCriterionTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Rates_ConferenceID",
                table: "Rates",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_Rates_PresentationID",
                table: "Rates",
                column: "PresentationID");

            migrationBuilder.CreateIndex(
                name: "IX_Rates_RateCriterionID",
                table: "Rates",
                column: "RateCriterionID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildingPlans");

            migrationBuilder.DropTable(
                name: "ConferenceAccommodations");

            migrationBuilder.DropTable(
                name: "ConferenceEmergencyNumbers");

            migrationBuilder.DropTable(
                name: "ConferenceOrganizer");

            migrationBuilder.DropTable(
                name: "ConferencePhoto");

            migrationBuilder.DropTable(
                name: "ConferencePointsOfInterest");

            migrationBuilder.DropTable(
                name: "ConferenceSponsors");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "ParticipantPhotos");

            migrationBuilder.DropTable(
                name: "PresentationParticipants");

            migrationBuilder.DropTable(
                name: "PresentationPhoto");

            migrationBuilder.DropTable(
                name: "Rates");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Accommodations");

            migrationBuilder.DropTable(
                name: "EmergencyNumbers");

            migrationBuilder.DropTable(
                name: "Organizer");

            migrationBuilder.DropTable(
                name: "PointsOfInterest");

            migrationBuilder.DropTable(
                name: "Sponsors");

            migrationBuilder.DropTable(
                name: "Participants");

            migrationBuilder.DropTable(
                name: "Presentations");

            migrationBuilder.DropTable(
                name: "RateCriteria");

            migrationBuilder.DropTable(
                name: "PointOfInterestTypes");

            migrationBuilder.DropTable(
                name: "Conferences");

            migrationBuilder.DropTable(
                name: "PresentationTypes");

            migrationBuilder.DropTable(
                name: "RateCriterionTypes");

            migrationBuilder.DropTable(
                name: "PointOfInterestIcon");
        }
    }
}
