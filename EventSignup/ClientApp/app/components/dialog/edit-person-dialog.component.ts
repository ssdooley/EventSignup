import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
    selector: 'edit-person-dialog',
    templateUrl: 'edit-person-dialog.component.html'
})
export class EditPersonDialogComponent {
    people: Array<Person> = new Array<Person>();
    person: Person = new Person();
    sexes = [
        'male',
        'female'
    ];

    constructor(private route: ActivatedRoute, private personService: PersonService, public dialogRef: MdDialogRef<EditPersonDialogComponent>) {
        personService.people.subscribe(people => {
            this.people = people;
        });

        personService.getAllPeople();
    }

    NgOnInit() {
        this.route.paramMap.subscribe(params => {
            this.personService.getPerson(Number.parseInt(params.get('id')));
        });
    }

    editPerson() {
        this.personService.editPerson();
        this.dialogRef.close();
    }
}