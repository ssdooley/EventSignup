import { Heat } from './heat.model';
import { Person } from './person.model';


export class PersonHeat {
    id: number;
    rxEvent: boolean;
    heat: Heat;
    person: Person;
}