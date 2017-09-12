using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventSignup.Data;
using EventSignup.Web.Models.ViewModels;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

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
                    userName = x.UserName,
                    email = x.Email,
                    peopleHeats = x.PeopleHeats.Select(y => new PersonHeatModel
                    {
                        id = y.Id,
                        rxEvent = y.RxEvent,
                        comments = y.Comments,
                        partner = y.Partner,
                        partnerRxEvent = y.PartnerRxEvent,
                        partnerSex = y.PartnerSex,
                        partnerName = y.PartnerName,
                        heat = new HeatModel
                        {
                            id = y.HeatId,
                            date = y.Heat.HeatTime,
                            name = y.Heat.Name,
                            slots = y.Heat.Slots
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
                    userName = x.UserName,
                    email = x.Email
                });

                return model.AsEnumerable();
            });
        }

        public static Task<IEnumerable<PersonModel>> GetAllPeople(this AppDbContext db)
        {
            return Task.Run(() =>
            {
                var model = db.People.Select(x => new PersonModel
                {
                    id = x.Id,
                    firstName = x.FirstName,
                    lastName = x.LastName,
                    sex = x.Sex,
                    userName = x.UserName,
                    email = x.Email
                });

                return model.AsEnumerable();
            });
        }

        public static Task<IEnumerable<PersonHeatModel>> GetPeopleHeats(this AppDbContext db)
        {
            return Task.Run(() =>
            {
                var model = db.PeopleHeats
                    .Include(x => x.Heat)
                    .Include(x => x.Person)
                    .Select(x => new PersonHeatModel
                    {
                        id = x.Id,
                        comments = x.Comments,
                        partner = x.Partner,
                        partnerName = x.PartnerName,
                        partnerRxEvent = x.PartnerName,
                        rxEvent = x.RxEvent,
                        partnerSex = x.PartnerSex,
                        heat = new HeatModel
                        {
                            id = x.HeatId,
                            date = x.Heat.HeatTime,
                            name = x.Heat.Name,
                            slots = x.Heat.Slots
                        },
                        person = new PersonModel
                        {
                            id = x.Id,
                            firstName = x.Person.FirstName,
                            lastName = x.Person.LastName,
                            sex = x.Person.Sex,
                            userName = x.Person.UserName,
                            email = x.Person.Email,
                        }
                    }).AsEnumerable();

                return model;
            });
        }

        public static async Task<PersonModel> FindPerson(this AppDbContext db, string email)
        {
            var person =  await db.People.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());

            if (person == null)
            {
                return new PersonModel();
            }

            var model = new PersonModel
            {
                id = person.Id,
                email = person.Email
            };

            return model;
        }

        public static async Task<PersonHeatModel>GetPersonHeat(this AppDbContext db, int id)
        {
            var personHeat = await db.PeopleHeats
                .Include(x => x.Heat)
                .Include(x => x.Person)
                .FirstOrDefaultAsync(x => x.Id == id);

            var model = new PersonHeatModel
            {
                id = personHeat.Id,
                rxEvent = personHeat.RxEvent,
                comments = personHeat.Comments,
                partner = personHeat.Partner,
                partnerRxEvent = personHeat.PartnerRxEvent,
                partnerName = personHeat.PartnerName,
                partnerSex = personHeat.PartnerSex,
                heat = new HeatModel
                {
                    id = personHeat.Heat.Id,
                    date = personHeat.Heat.HeatTime,
                    name = personHeat.Heat.Name,
                    slots = personHeat.Heat.Slots
                },
                person = new PersonModel
                {
                    id = personHeat.Person.Id,
                    firstName = personHeat.Person.FirstName,
                    lastName = personHeat.Person.LastName,
                    email = personHeat.Person.Email,
                    sex = personHeat.Person.Sex,
                    userName = personHeat.Person.UserName,
                }
            };

            return model;
        }

        public static async Task AddPerson(this AppDbContext db, PersonModel model)
        {
            if (await model.Validate(db))
            {
                var person = new Person
                {
                    Id = model.id,
                    FirstName = model.firstName,
                    LastName = model.lastName,
                    Sex = model.sex,
                    UserName = model.userName,
                    Password = model.password,
                    Email = model.email

                };

                await db.People.AddAsync(person);
                await db.SaveChangesAsync();
            }
        }

        public static async Task AddPartner(this AppDbContext db, PersonModel model)
        {
            if (await model.Validate(db))
            {
                var person = new Person
                {
                    Id = model.id,
                    FirstName = model.firstName,
                    LastName = model.lastName,
                    Sex = model.sex,
                    UserName = model.userName,
                    Email = model.email

                };

                await db.People.AddAsync(person);
                await db.SaveChangesAsync();
            }
        }

        public static async Task EditPerson(this AppDbContext db, PersonModel model)
        {
            if (model.id < 1)
            {
                throw new Exception("The provided Person does not exist");
            }

            if (await model.Validate(db))
            {
                var person = await db.People.FindAsync(model.id);

                person.Id = model.id;
                person.FirstName = model.firstName;
                person.LastName = model.lastName;
                person.Email = model.email;
                person.UserName = model.userName;
                person.Password = model.password;
                person.Sex = model.sex;

                await db.SaveChangesAsync();
            }
            
        }

        public static async Task DeletePerson(this AppDbContext db, int id)
        {
            var person = await db.People.FindAsync(id);
            db.People.Remove(person);
            await db.SaveChangesAsync();
        }

        public static async Task AddPersonHeat(this AppDbContext db, PersonHeatModel model)
        {
            if (await model.ValidatePersonHeat(db))
            {
                if (model.person.id < 1)
                {
                    await db.AddPerson(model.person);
                }

                var personHeat = new PersonHeat
                {
                    PersonId = model.person.id,
                    HeatId = model.heat.id,
                    RxEvent = model.rxEvent,
                    Comments = model.comments,
                    Partner = model.partner,
                    PartnerName = model.partnerName,
                    PartnerRxEvent = model.partnerRxEvent,
                    PartnerSex = model.partnerSex
                };

                await db.PeopleHeats.AddAsync(personHeat);
                await db.SaveChangesAsync();
            }
        }

        public static async Task EditPersonHeat(this AppDbContext db, PersonHeatModel model)
        {
            if (await model.ValidatePersonHeat(db))
            {
                var personHeat = await db.PeopleHeats.FindAsync(model.id);
                personHeat.RxEvent = model.rxEvent;
                personHeat.HeatId = model.heat.id;
                personHeat.Comments = model.comments;
                personHeat.Partner = model.partner;
                personHeat.PartnerRxEvent = model.partnerRxEvent;
                personHeat.PartnerName = model.partnerName;
                personHeat.PartnerSex = model.partnerSex;
                await db.SaveChangesAsync();
            }
        }

        public static async Task DeletePersonHeat(this AppDbContext db, int id)
        {
            var personheat = await db.PeopleHeats.FindAsync(id);
            db.PeopleHeats.Remove(personheat);
            await db.SaveChangesAsync();
        }

        public static async Task<bool> Validate(this PersonModel model, AppDbContext db)
        {
            if (model.firstName == null)
            {
                throw new Exception("Person must have a First Name");
            }

            if (model.lastName == null)
            {
                throw new Exception("Person must have a Last Name");
            }

            if (model.sex == null)
            {
                throw new Exception("Person must select a sex");
            }

            if (!string.IsNullOrEmpty(model.email))
            {
                if (!model.email.ValidateEmail())
                {
                    throw new Exception("The email provided is invalid");
                }
            }

            if (model.id > 0)
            {
                var check = await db.People.FirstOrDefaultAsync(x => x.Id != model.id && (x.UserName.ToLower() == model.userName.ToLower() || x.Email.ToLower() == model.email.ToLower()));
                
                if (check != null)
                {
                    throw new Exception("The provided person already exists");
                }
            }
            else
            {
                var check = await db.People.FirstOrDefaultAsync(x => x.UserName.ToLower() == model.userName.ToLower() || x.Email.ToLower() == model.email.ToLower());

                if (check != null)
                {
                    throw new Exception("The provided person already exists");
                }
            }

            return true;
        }

        public static async Task<bool> ValidatePersonHeat(this PersonHeatModel model, AppDbContext db)
        {
            if (model.heat == null)
            {
                throw new Exception("Heat must be selected");
            }

            if (string.IsNullOrEmpty(model.rxEvent))
            {
                throw new Exception("Event Type must be selected");
            }

            if (model.person.id > 0)
            {
                var check = await db.PeopleHeats
                    .FirstOrDefaultAsync(x => x.Id == model.person.id);
                if (check != null)
                {
                    throw new Exception("Must select a different Person to be assigned to Heat");
                }
            }

            if (model.partner == null)
            {
                throw new Exception("Do you have a partner?");
            }

            if (model.partner == true && model.partnerName == null)
            {
                throw new Exception("Please enter the first and last name for your partner");
            }

            if (model.partner == true && model.partnerRxEvent == null)
            {
                throw new Exception("Please select at what level/scale your partner will performing");
            }

            if (model.partner == true && model.partnerSex == null)
            {
                throw new Exception("Please select the appropriate gender for your partner");
            }

            return true;
        }

        public static bool ValidateEmail(this string email)
        {
            try
            {
                var check = new Regex(@"[a-z0-9](\.[a-z0-9_-]){0,}@[a-z0-9]+\.([a-z]{1,6}\.)?[a-z]{2,6}$");
                return check.IsMatch(email);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.GetExceptionMessageChain());
            }
        }

        
    }
}
