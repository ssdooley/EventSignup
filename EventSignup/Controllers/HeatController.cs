using EventSignup.Data;
using EventSignup.Web.Models.Extensions;
using EventSignup.Web.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventSignup.Web.Controllers
{
    [Route("api/[controller]")]
    public class HeatController : Controller
    {
        private AppDbContext db;

        public HeatController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<HeatModel>> GetHeats()
        {
            return await db.GetHeats();
        }

        [HttpGet("[action]/{id}")]
        public async Task<HeatModel> GetHeat([FromRoute]int id)
        {
            return await db.GetHeat(id);
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> AddHeat([FromBody]HeatModel model)
        {
            await db.AddHeat(model);
            return Created("/api/Heat/AddHeat", model);
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> EditHeat([FromBody]HeatModel model)
        {
            await db.EditHeat(model);
            return Accepted("/api/Heat/EditHeat", model);
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> DeleteHeat([FromBody] int id)
        {
            await db.DeleteHeat(id);
            return Accepted("/api/Heat/DeleteHeat", id);
        }
    }
}
