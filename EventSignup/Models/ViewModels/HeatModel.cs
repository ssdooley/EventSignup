using EventSignup.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventSignup.Web.Models.ViewModels
{
    public class HeatModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public DateTime date { get; set; }
        public DateTime time { get; set; }
        public int slots { get; set; }

        public IEnumerable<PersonHeatModel> peopleHeats { get; set; }
    }
}
