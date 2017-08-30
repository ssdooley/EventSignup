import { Component } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';

@Component({
    selector: 'person-edit',
    templateUrl: 'person-edit.component.html',
    styleUrls: ['person-edit.component.css']
})
export class PersonEditComponent {
    person: Person = new Person();
    sexes = [
        'Male',
        'Female'
    ];

    constructor(private personService: PersonService) {
        this.personService.newPerson.subscribe(person => {
            this.person = person;
        });
    }
    
}