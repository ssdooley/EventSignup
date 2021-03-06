﻿using System;
using System.Collections.Generic;
using System.Text;

namespace EventSignup.Data
{
    public class Heat
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime HeatTime { get; set; }
        public int Slots { get; set; }
        
        public virtual ICollection<PersonHeat> PeopleHeats { get; set; }
    }
}
