using System;
using System.Collections.Generic;
using System.Text;

namespace EventSignup.Data
{
    public class PersonHeat
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int HeatId { get; set; }
        public string RxEvent { get; set; }
        public bool? Partner { get; set; }
        public string Comments { get; set; }
        public string PartnerRxEvent { get; set; }
        public string PartnerName { get; set; }
        public string PartnerSex { get; set; }

        public Person Person { get; set; }
        public Heat Heat { get; set; }
    }
}
