using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Persistence.Migrations
{
    public partial class messages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ParticipantPhotos_ParticipantID",
                table: "ParticipantPhotos");

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

            migrationBuilder.CreateIndex(
                name: "IX_ParticipantPhotos_ParticipantID",
                table: "ParticipantPhotos",
                column: "ParticipantID",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropIndex(
                name: "IX_ParticipantPhotos_ParticipantID",
                table: "ParticipantPhotos");

            migrationBuilder.CreateIndex(
                name: "IX_ParticipantPhotos_ParticipantID",
                table: "ParticipantPhotos",
                column: "ParticipantID");
        }
    }
}
