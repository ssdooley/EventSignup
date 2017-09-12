using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventSignup.Web.Models.ViewModels
{
    public class PersonHeatModel
    {
        public int id { get; set; }
        public string rxEvent { get; set; }
        public bool? partner { get; set; }
        public string comments {get;set;}
        public string partnerRxEvent { get; set; }
        public string partnerName { get; set; }
        public string partnerSex { get; set; }

        public PersonModel person { get; set; }
        public HeatModel heat { get; set; }        
    }
}
