using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class IconsAsFiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "XmlContent",
                table: "PointOfInterestIcon");

            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "PointOfInterestIcon",
                maxLength: 512,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Path",
                table: "PointOfInterestIcon");

            migrationBuilder.AddColumn<string>(
                name: "XmlContent",
                table: "PointOfInterestIcon",
                type: "xml",
                nullable: true);
        }
    }
}
