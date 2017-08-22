using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EventSignup.Data.Migrations
{
    public partial class RxEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "People",
                newName: "UserName");

            migrationBuilder.AlterColumn<string>(
                name: "RxEvent",
                table: "PeopleHeats",
                nullable: true,
                oldClrType: typeof(bool));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "People",
                newName: "Username");

            migrationBuilder.AlterColumn<bool>(
                name: "RxEvent",
                table: "PeopleHeats",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
