using Microsoft.EntityFrameworkCore.Migrations;

namespace AlugaHouse.Repository.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Residences",
                columns: table => new
                {
                    ResidenceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZipCode = table.Column<string>(maxLength: 9, nullable: false),
                    StreetAddress = table.Column<string>(maxLength: 70, nullable: false),
                    NumberAddress = table.Column<int>(nullable: false),
                    Complement = table.Column<string>(maxLength: 70, nullable: true),
                    Neighborhood = table.Column<string>(maxLength: 70, nullable: false),
                    City = table.Column<string>(maxLength: 70, nullable: false),
                    State = table.Column<string>(maxLength: 2, nullable: false),
                    Rented = table.Column<bool>(nullable: false),
                    ResidenceTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Residences", x => x.ResidenceId);
                });

            migrationBuilder.CreateTable(
                name: "ResidenceTypes",
                columns: table => new
                {
                    ResidenceTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResidenceTypeName = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResidenceTypes", x => x.ResidenceTypeId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Residences");

            migrationBuilder.DropTable(
                name: "ResidenceTypes");
        }
    }
}
