﻿using System;
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

                    b.Property<DateTime>("HeatTime");

                    b.Property<string>("Name");

                    b.Property<int>("Slots");

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

                    b.Property<string>("Password");

                    b.Property<string>("Sex");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("People");
                });

            modelBuilder.Entity("EventSignup.Data.PersonHeat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comments");

                    b.Property<int>("HeatId");

                    b.Property<bool?>("Partner");

                    b.Property<string>("PartnerName");

                    b.Property<string>("PartnerRxEvent");

                    b.Property<string>("PartnerSex");

                    b.Property<int>("PersonId");

                    b.Property<string>("RxEvent");

                    b.HasKey("Id");

                    b.HasIndex("HeatId");

                    b.HasIndex("PersonId");

                    b.ToTable("PeopleHeats");
                });

            modelBuilder.Entity("EventSignup.Data.PersonHeat", b =>
                {
                    b.HasOne("EventSignup.Data.Heat", "Heat")
                        .WithMany("PeopleHeats")
                        .HasForeignKey("HeatId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("EventSignup.Data.Person", "Person")
                        .WithMany("PeopleHeats")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
