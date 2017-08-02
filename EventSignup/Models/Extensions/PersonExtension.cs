using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventSignup.Data;
using EventSignup.Web.Models.ViewModels;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace EventSignup.Web.Models.Extensions
{
    public static class PersonExtension
    {
        public static Task<IEnumerable<PersonModel>> GetPerson(this AppDbContext db)
        {
            return Task.Run(() =>
            {
                var model = db.People.Include("PeopleHeats.Heat.Slots").Select(x => new PersonModel
                {
                    id = x.Id,
                    firstName = x.FirstName,
                    lastName = x.LastName,
                    sex = x.Sex,
                    username = x.Username,
                    email = x.Email,
                    peopleHeats = x.PeopleHeats.Select(y => new PersonHeatModel
                    {
                        id = y.Id,
                        rxEvent = y.RxEvent,
                        heat = new HeatModel
                        {
                            id = y.HeatId,
                            date = y.Heat.Date,
                            name = y.Heat.Name,
                            time = y.Heat.Time,
                            slots = y.Heat.Slots.Select(z => new SlotModel
                            {
                                id = z.Id,
                                numHeats = z.NumHeats
                            }).AsEnumerable()
                        }
                    }).AsEnumerable()
                });

                return model.AsEnumerable();
            });
        }

        public static Task<IEnumerable<PersonModel>> GetPeople(this AppDbContext db)
        {
            return Task.Run(() =>
            {
                var model = db.People.Include("PeopleHeats.Date").Select(x => new PersonModel
                {
                    id = x.Id,
                    firstName = x.FirstName,
                    lastName = x.LastName,
                    sex = x.Sex,
                    username = x.Username,
                    email = x.Email
                });

                return model.AsEnumerable();
            });
        }
    }
}
