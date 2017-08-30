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
        public DateTime dateTime => new DateTime(date.Year, date.Month, date.Day, hour, minute, 0);
        public DateTime date { get; set; }
        public int hour { get; set; }
        public int minute { get; set; }
        public int slots { get; set; }

        public IEnumerable<PersonHeatModel> peopleHeats { get; set; }
    }
}
