using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventSignup.Web.Models.ViewModels
{
    public class PersonHeatModel
    {
        public int id { get; set; }
        public bool rxEvent { get; set; }
        public PersonModel person { get; set; }
        public HeatModel heat { get; set; }
    }
}
