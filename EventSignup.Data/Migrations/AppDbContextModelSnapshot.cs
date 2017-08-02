using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using EventSignup.Data;

namespace EventSignup.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EventSignup.Data.Heat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<string>("Name");

                    b.Property<DateTime>("Time");

                    b.HasKey("Id");

                    b.ToTable("Heats");
                });

            modelBuilder.Entity("EventSignup.Data.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Passowrd");

                    b.Property<string>("Sex");

                    b.Property<int?>("SlotId");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.HasIndex("SlotId");

                    b.ToTable("People");
                });

            modelBuilder.Entity("EventSignup.Data.PersonHeat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("HeatId");

                    b.Property<int>("PersonId");

                    b.Property<bool>("RxEvent");

                    b.HasKey("Id");

                    b.ToTable("PeopleHeats");
                });

            modelBuilder.Entity("EventSignup.Data.Slot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("HeatId");

                    b.Property<int>("NumHeats");

                    b.HasKey("Id");

                    b.HasIndex("HeatId");

                    b.ToTable("Slots");
                });

            modelBuilder.Entity("EventSignup.Data.Person", b =>
                {
                    b.HasOne("EventSignup.Data.Slot")
                        .WithMany("People")
                        .HasForeignKey("SlotId");
                });

            modelBuilder.Entity("EventSignup.Data.Slot", b =>
                {
                    b.HasOne("EventSignup.Data.Heat")
                        .WithMany("Slots")
                        .HasForeignKey("HeatId");
                });
        }
    }
}
