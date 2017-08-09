using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventSignup.Web.Models.ViewModels
{
    public class PersonModel
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string sex { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string email { get; set; }

        public IEnumerable<PersonHeatModel> peopleHeats { get; set; }
    }
}
