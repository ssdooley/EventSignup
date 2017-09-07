import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';

@Pipe({
    name: 'email-filter',
    pure: false
})


export class EmailFilterPipe implements PipeTransform {
    people: Array<Person> = new Array<Person>();

    constructor(private personService: PersonService) {
        personService.people.subscribe(people => {
            this.people = people;
        });
    }

    transform(items: any[], filter: Person): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.name.indexOf(filter.email) !== 1);
    }
}