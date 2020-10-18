using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Persistence.Migrations
{
    public partial class Initial : Migration
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
                    Number = table.Column<string>(maxLength: 32, nullable: true)
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
                    YouTubeLink = table.Column<string>(maxLength: 128, nullable: true)
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
                name: "PointOfInterestTypes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<int>(maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointOfInterestTypes", x => x.ID);
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
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    NormalizedName = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Speakers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Company = table.Column<string>(maxLength: 128, nullable: true),
                    Country = table.Column<string>(maxLength: 32, nullable: true),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    FirstName = table.Column<string>(maxLength: 32, nullable: true),
                    LastName = table.Column<string>(maxLength: 32, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speakers", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sponsors",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(maxLength: 128, nullable: true),
                    Country = table.Column<string>(maxLength: 32, nullable: true),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    LogoPath = table.Column<string>(maxLength: 256, nullable: true),
                    Name = table.Column<string>(maxLength: 32, nullable: true),
                    Number = table.Column<string>(maxLength: 16, nullable: true),
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
                name: "PointsOfInterest",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(maxLength: 32, nullable: true),
                    Address = table.Column<string>(maxLength: 128, nullable: true),
                    Contact = table.Column<string>(maxLength: 32, nullable: true),
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
                name: "Presentations",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Place = table.Column<string>(maxLength: 128, nullable: true),
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
                name: "SpeakerPhotos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Path = table.Column<string>(maxLength: 128, nullable: true),
                    SpeakerID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpeakerPhotos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SpeakerPhotos_Speakers_SpeakerID",
                        column: x => x.SpeakerID,
                        principalTable: "Speakers",
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

            migrationBuilder.CreateTable(
                name: "PresentationSpeakers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PresentationID = table.Column<int>(nullable: false),
                    SpeakerID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentationSpeakers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PresentationSpeakers_Presentations_PresentationID",
                        column: x => x.PresentationID,
                        principalTable: "Presentations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PresentationSpeakers_Speakers_SpeakerID",
                        column: x => x.SpeakerID,
                        principalTable: "Speakers",
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
                    ConferenceID = table.Column<int>(nullable: false),
                    PresentationID = table.Column<int>(nullable: false),
                    UserID = table.Column<int>(nullable: false),
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
                    table.ForeignKey(
                        name: "FK_Rates_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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
                name: "IX_PointsOfInterest_PointOfInterestTypeID",
                table: "PointsOfInterest",
                column: "PointOfInterestTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Presentations_ConferenceID",
                table: "Presentations",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_Presentations_PresentationTypeID",
                table: "Presentations",
                column: "PresentationTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_PresentationSpeakers_PresentationID",
                table: "PresentationSpeakers",
                column: "PresentationID");

            migrationBuilder.CreateIndex(
                name: "IX_PresentationSpeakers_SpeakerID",
                table: "PresentationSpeakers",
                column: "SpeakerID");

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

            migrationBuilder.CreateIndex(
                name: "IX_Rates_UserID",
                table: "Rates",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_SpeakerPhotos_SpeakerID",
                table: "SpeakerPhotos",
                column: "SpeakerID");
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
                name: "ConferencePointsOfInterest");

            migrationBuilder.DropTable(
                name: "ConferenceSponsors");

            migrationBuilder.DropTable(
                name: "PresentationSpeakers");

            migrationBuilder.DropTable(
                name: "Rates");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "SpeakerPhotos");

            migrationBuilder.DropTable(
                name: "Accommodations");

            migrationBuilder.DropTable(
                name: "EmergencyNumbers");

            migrationBuilder.DropTable(
                name: "PointsOfInterest");

            migrationBuilder.DropTable(
                name: "Sponsors");

            migrationBuilder.DropTable(
                name: "Presentations");

            migrationBuilder.DropTable(
                name: "RateCriteria");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Speakers");

            migrationBuilder.DropTable(
                name: "PointOfInterestTypes");

            migrationBuilder.DropTable(
                name: "Conferences");

            migrationBuilder.DropTable(
                name: "PresentationTypes");

            migrationBuilder.DropTable(
                name: "RateCriterionTypes");
        }
    }
}
