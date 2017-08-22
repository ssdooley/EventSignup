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

        public Person Person { get; set; }
        public Heat Heat { get; set; }
    }
}
