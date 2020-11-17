using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Persistence.Migrations
{
    public partial class PhotosIconsAuthorsAndSpeakersAndRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rates_Users_UserID",
                table: "Rates");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Rates_UserID",
                table: "Rates");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Rates");

            migrationBuilder.AddColumn<int>(
                name: "MobileUserID",
                table: "Rates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsAuthor",
                table: "PresentationParticipants",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSpeaker",
                table: "PresentationParticipants",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PointOfInterestIconID",
                table: "PointOfInterestTypes",
                nullable: false,
                defaultValue: 0);

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
                name: "PointOfInterestIcon",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    XmlContent = table.Column<string>(type: "xml", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointOfInterestIcon", x => x.ID);
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

            migrationBuilder.CreateIndex(
                name: "IX_PointOfInterestTypes_PointOfInterestIconID",
                table: "PointOfInterestTypes",
                column: "PointOfInterestIconID");

            migrationBuilder.CreateIndex(
                name: "IX_ConferencePhoto_ConferenceID",
                table: "ConferencePhoto",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_PresentationPhoto_PresentationID",
                table: "PresentationPhoto",
                column: "PresentationID");

            migrationBuilder.AddForeignKey(
                name: "FK_PointOfInterestTypes_PointOfInterestIcon_PointOfInterestIco~",
                table: "PointOfInterestTypes",
                column: "PointOfInterestIconID",
                principalTable: "PointOfInterestIcon",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PointOfInterestTypes_PointOfInterestIcon_PointOfInterestIco~",
                table: "PointOfInterestTypes");

            migrationBuilder.DropTable(
                name: "ConferencePhoto");

            migrationBuilder.DropTable(
                name: "PointOfInterestIcon");

            migrationBuilder.DropTable(
                name: "PresentationPhoto");

            migrationBuilder.DropIndex(
                name: "IX_PointOfInterestTypes_PointOfInterestIconID",
                table: "PointOfInterestTypes");

            migrationBuilder.DropColumn(
                name: "MobileUserID",
                table: "Rates");

            migrationBuilder.DropColumn(
                name: "IsAuthor",
                table: "PresentationParticipants");

            migrationBuilder.DropColumn(
                name: "IsSpeaker",
                table: "PresentationParticipants");

            migrationBuilder.DropColumn(
                name: "PointOfInterestIconID",
                table: "PointOfInterestTypes");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Rates",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    NormalizedName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    RoleID = table.Column<int>(type: "integer", nullable: false),
                    UserID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.RoleID, x.UserID });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rates_UserID",
                table: "Rates",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserID",
                table: "UserRoles",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rates_Users_UserID",
                table: "Rates",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
