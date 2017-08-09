using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EventSignup.Data.Migrations
{
    public partial class addmigrationslots : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_People_Slots_SlotId",
                table: "People");

            migrationBuilder.DropTable(
                name: "Slots");

            migrationBuilder.DropIndex(
                name: "IX_People_SlotId",
                table: "People");

            migrationBuilder.DropColumn(
                name: "SlotId",
                table: "People");

            migrationBuilder.RenameColumn(
                name: "Passowrd",
                table: "People",
                newName: "Password");

            migrationBuilder.AddColumn<int>(
                name: "Slots",
                table: "Heats",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PeopleHeats_HeatId",
                table: "PeopleHeats",
                column: "HeatId");

            migrationBuilder.CreateIndex(
                name: "IX_PeopleHeats_PersonId",
                table: "PeopleHeats",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_PeopleHeats_Heats_HeatId",
                table: "PeopleHeats",
                column: "HeatId",
                principalTable: "Heats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PeopleHeats_People_PersonId",
                table: "PeopleHeats",
                column: "PersonId",
                principalTable: "People",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PeopleHeats_Heats_HeatId",
                table: "PeopleHeats");

            migrationBuilder.DropForeignKey(
                name: "FK_PeopleHeats_People_PersonId",
                table: "PeopleHeats");

            migrationBuilder.DropIndex(
                name: "IX_PeopleHeats_HeatId",
                table: "PeopleHeats");

            migrationBuilder.DropIndex(
                name: "IX_PeopleHeats_PersonId",
                table: "PeopleHeats");

            migrationBuilder.DropColumn(
                name: "Slots",
                table: "Heats");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "People",
                newName: "Passowrd");

            migrationBuilder.AddColumn<int>(
                name: "SlotId",
                table: "People",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Slots",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    HeatId = table.Column<int>(nullable: true),
                    NumHeats = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Slots_Heats_HeatId",
                        column: x => x.HeatId,
                        principalTable: "Heats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_People_SlotId",
                table: "People",
                column: "SlotId");

            migrationBuilder.CreateIndex(
                name: "IX_Slots_HeatId",
                table: "Slots",
                column: "HeatId");

            migrationBuilder.AddForeignKey(
                name: "FK_People_Slots_SlotId",
                table: "People",
                column: "SlotId",
                principalTable: "Slots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
