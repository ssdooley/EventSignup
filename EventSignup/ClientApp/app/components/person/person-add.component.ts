import { Component } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';

@Component({
    selector: 'person-add',
    templateUrl: 'person-add.component.html',
    styleUrls: ['person-add.component.css']
})
export class PersonAddComponent {
    person: Person = new Person();
    sexes = [
        'male',
        'female'
    ];

    constructor(private personService: PersonService) {
        this.personService.newPerson.subscribe(person => {
            this.person = person;
        });
    }

    addPerson() {
        this.personService.addPerson(this.person).subscribe(
            res => {
                this.personService.addSuccessful(this.person);
                this.person = new Person;               
            },
            error => {
                this.personService.addFailed(error);
            }
        );
    }
}