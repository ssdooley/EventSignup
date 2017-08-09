using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventSignup.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Person> People { get; set; }
        public DbSet<Heat> Heats { get; set; }
        public DbSet<PersonHeat> PeopleHeats { get; set; }
    }
}
