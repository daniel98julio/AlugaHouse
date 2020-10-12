using Microsoft.EntityFrameworkCore.Migrations;

namespace AlugaHouse.Repository.Migrations
{
    public partial class adjustFk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Residences_ResidenceTypeId",
                table: "Residences",
                column: "ResidenceTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Residences_ResidenceTypes_ResidenceTypeId",
                table: "Residences",
                column: "ResidenceTypeId",
                principalTable: "ResidenceTypes",
                principalColumn: "ResidenceTypeId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Residences_ResidenceTypes_ResidenceTypeId",
                table: "Residences");

            migrationBuilder.DropIndex(
                name: "IX_Residences_ResidenceTypeId",
                table: "Residences");
        }
    }
}
