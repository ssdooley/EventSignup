using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EventSignup.Data.Migrations
{
    public partial class Partner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "PeopleHeats",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Partner",
                table: "PeopleHeats",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartnerName",
                table: "PeopleHeats",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartnerRxEvent",
                table: "PeopleHeats",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comments",
                table: "PeopleHeats");

            migrationBuilder.DropColumn(
                name: "Partner",
                table: "PeopleHeats");

            migrationBuilder.DropColumn(
                name: "PartnerName",
                table: "PeopleHeats");

            migrationBuilder.DropColumn(
                name: "PartnerRxEvent",
                table: "PeopleHeats");
        }
    }
}
