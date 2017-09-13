import { PersonHeat } from './person-heat.model';

export class Heat {
    id: number;
    name: string;
    date: Date;
    time: Date;
    hour: number;
    minute: number;
    slots: number;
    available: number;
    peopleHeats: Array<PersonHeat>;
}