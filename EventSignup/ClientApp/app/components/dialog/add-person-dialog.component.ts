import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
    selector: 'add-person-dialog',
    templateUrl: 'add-person-dialog.component.html'
})
export class AddPersonDialogComponent {
    person: Person = new Person();
    sexes = [
        'male',
        'female'
    ];

    constructor(private personService: PersonService, public dialogRef: MdDialogRef<AddPersonDialogComponent>) {
        personService.newPerson.subscribe(person => {
            this.person = person;
        });
    }
    
    addPerson() {
        this.personService.addPerson(this.person).subscribe(
            res => {
                this.personService.addSuccessful(this.person);
                this.dialogRef.close();
            },
            error => {
                this.personService.addFailed(error);
            }
        );        
    }
    
}