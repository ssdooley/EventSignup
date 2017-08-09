import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';

@Component({
    selector: 'person-list',
    templateUrl: 'person-list.component.html',
    styleUrls: ['person-list.component.css']
})
export class PeopleListComponent {
    people: Array<Person> = new Array<Person>();

    constructor(private personService: PersonService) {
        personService.people.subscribe(people => {
            this.people = people;
        });
    }

    ngOnInit() {
        this.personService.getAllPeople();
    }
}