import { Heat } from './heat.model';
import { Person } from './person.model';


export class PersonHeat {
    id: number;
    rxEvent: string;
    partner: boolean;
    partnerRxEvent: string;
    partnerComments: string;
    partnerName: string;
    heat: Heat;
    person: Person;
    partnerSex: string;

    constructor() {
        this.heat = new Heat();
        this.person = new Person();
    }
}