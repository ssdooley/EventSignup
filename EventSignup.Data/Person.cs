using System.Collections.Generic;

namespace EventSignup.Data
{
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Sex { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public virtual ICollection<PersonHeat> PeopleHeats { get; set; }
    }
}
