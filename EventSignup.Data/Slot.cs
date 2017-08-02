using System;
using System.Collections.Generic;
using System.Text;

namespace EventSignup.Data
{
    public class Slot
    {
        public int Id { get; set; }
        public int NumHeats { get; set; }

        public virtual ICollection<Person> People { get; set; }
    }
}
