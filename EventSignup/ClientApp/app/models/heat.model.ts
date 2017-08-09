import { PersonHeat } from './person-heat.model';

export class Heat {
    id: number;
    name: string;
    date: Date;
    time: Date;
    slots: number;
    peopleHeats: Array<PersonHeat>;
}