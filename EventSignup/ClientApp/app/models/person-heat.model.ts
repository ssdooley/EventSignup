import { Heat } from './heat.model';
import { Person } from './person.model';


export class PersonHeat {
    id: number;
    rxEvent: string;
    heat: Heat;
    person: Person;
}