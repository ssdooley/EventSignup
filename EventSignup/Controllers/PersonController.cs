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
        public async Task<IEnumerable<PersonModel>> GetPeople()
        {
            return await db.GetPeople();
        }
    }
}