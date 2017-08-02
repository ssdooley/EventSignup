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
                var model = db.Heats.Include(x => x.Slots).Select(x => new HeatModel
                {
                    id = x.Id,
                    date = x.Date,
                    name = x.Name,
                    time = x.Time,
                    slots = x.Slots.Select(y => new SlotModel
                    {
                        id = y.Id,
                        numHeats = y.NumHeats
                    }).AsEnumerable()
                });

                return model.AsEnumerable();
            });
        }                    
    }
}
