using EventSignup.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventSignup.Web.Models.ViewModels
{
    public class SlotModel
    {
        public int id { get; set; }
        public int numHeats { get; set; }

        public virtual IEnumerable<Person> people { get; set; }
    }
}
