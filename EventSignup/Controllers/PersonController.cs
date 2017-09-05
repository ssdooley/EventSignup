using EventSignup.Data;
using EventSignup.Web.Models.Extensions;
using EventSignup.Web.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventSignup.Web.Controllers
{
    [Route("api/[controller]")]
    public class PersonController : Controller
    {
        private AppDbContext db;

        public PersonController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<PersonModel>> GetPerson()
        {
            return await db.GetPerson();
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<PersonModel>> GetAllPeople()
        {
            return await db.GetAllPeople();
        }

        [HttpGet("[action]/{id}")]
        public async Task<PersonHeatModel> GetPersonHeat([FromRoute]int id)
        {
            return await db.GetPersonHeat(id);
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<PersonHeatModel>> GetPeopleHeats()
        {
            return await db.GetPeopleHeats();
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> AddPerson([FromBody]PersonModel model)
        {
            await db.AddPerson(model);
            return Created("/api/Person/AddPerson", model);
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> EditPerson([FromBody]PersonModel model)
        {
            await db.EditPerson(model);
            return Accepted("/api/Person/EditPerson", model);
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> DeletePerson([FromBody]int id)
        {
            await db.DeletePerson(id);
            return Accepted("/api/Person/DeletePerson", id);
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> AddPersonHeat([FromBody]PersonHeatModel model)
        {
            await db.AddPersonHeat(model);
            return Created("/api/Person/AddPersonHeat", model);
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> EditPersonHeat([FromBody]PersonHeatModel model)
        {
            await db.EditPersonHeat(model);
            return Accepted("/api/Person/EditPersonHeat", model);
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> DeletePersonHeat([FromBody]int id)
        {
            await db.DeletePersonHeat(id);
            return Accepted("/api/Person/DeletePersonHeat", id);
        }
    }
}