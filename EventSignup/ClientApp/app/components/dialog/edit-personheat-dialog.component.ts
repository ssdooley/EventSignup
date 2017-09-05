import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';
import { PersonHeat } from '../../models/person-heat.model';

@Component({
    selector: 'edit-personheat-dialog',
    templateUrl: 'edit-personheat-dialog.component.html'
})
export class EditPersonHeatDialogComponent {
    personHeat = new PersonHeat();
    heats: Heat[] = new Array<Heat>();
    people: Person[] = new Array<Person>();
    person: Person = new Person();
    scales = ['RX', 'SCALED'];

    constructor(
        private personService: PersonService,
        private heatService: HeatService,
        public dialogRef: MdDialogRef<EditPersonHeatDialogComponent>) {
        personService.people.subscribe(people => {
            this.people = people;
        });

        heatService.heats.subscribe(heat => {
            this.heats = heat;
        });

        personService.personHeat.subscribe(person => {
            this.personHeat = person;
        });
        
    }

    editPerson() {
        this.personService.editPersonHeat();
        this.dialogRef.close();
    }
}