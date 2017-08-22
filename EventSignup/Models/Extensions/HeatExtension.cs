using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventSignup.Data;
using EventSignup.Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace EventSignup.Web.Models.Extensions
{
    public static class HeatExtension
    {
        public static Task<IEnumerable<HeatModel>> GetHeats(this AppDbContext db)
        {
            return Task.Run(() =>
            {
                var model = db.Heats.Include("PeopleHeats.Person").Select(x => new HeatModel
                {
                    id = x.Id,
                    date = x.Date,
                    name = x.Name,
                    time = x.Time,
                    slots = x.Slots,
                    peopleHeats = x.PeopleHeats.Select(y => new PersonHeatModel
                    {
                        id = y.PersonId,
                        rxEvent = y.RxEvent,
                        person = new PersonModel
                        {
                            firstName = y.Person.FirstName,
                            lastName = y.Person.LastName,
                            userName = y.Person.UserName,
                            sex = y.Person.Sex,
                            email = y.Person.Email
                        }
                    }).AsEnumerable()

                });

                return model.AsEnumerable();
            });
        }

        public static async Task AddHeat(this AppDbContext db, HeatModel model)
        {
            if (await model.Validate(db))
            {
                var heat = new Heat
                {
                    Name = model.name,
                    Date = model.date,
                    Id = model.id,
                    Slots = model.slots
                };

                await db.Heats.AddAsync(heat);
                await db.SaveChangesAsync();
            }
        }

        public static async Task EditHeat(this AppDbContext db, HeatModel model)
        {
            if (await model.Validate(db))
            {
                var heat = await db.Heats.FindAsync(model.id);

                heat.Name = model.name;

                await db.SaveChangesAsync();
            }
        }

        public static async Task DeleteHeat(this AppDbContext db, int id)
        {
            var heat = await db.Heats.FindAsync(id);
            await heat.DeleteDependencies(db);
            db.Heats.Remove(heat);
            await db.SaveChangesAsync();
        }

        public static async Task DeleteDependencies(this Heat heat, AppDbContext db)
        {
            var peopleHeats = db.PeopleHeats.Where(x => x.HeatId == heat.Id);
            db.PeopleHeats.RemoveRange(peopleHeats);
            await db.SaveChangesAsync();
        }

        public static async Task<bool> Validate(this HeatModel model, AppDbContext db)
        {
            if (model.name == null)
            {
                throw new Exception("Heat must have a name");
            }

            if (model.id > 0)
            {
                var check = await db.Heats
                    .FirstOrDefaultAsync(x => x.Name.ToLower() == model.name.ToLower() && !(x.Id == model.id));
                if (check != null)
                {
                    throw new Exception("The provided heat already exists");
                }
            }
            else
            {
                var check = await db.Heats.FirstOrDefaultAsync(x => x.Name.ToLower() == model.name.ToLower());

                if(check != null)
                {
                    throw new Exception("The provided Heat Name is already in use");
                }
            }
           

            return true;
        }
    }
}
