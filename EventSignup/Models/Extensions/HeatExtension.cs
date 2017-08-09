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
                            userName = y.Person.Username,
                            sex = y.Person.Sex,
                            email = y.Person.Email
                        }
                    }).AsEnumerable()

                });

                return model.AsEnumerable();
            });
        }                    
    }
}
