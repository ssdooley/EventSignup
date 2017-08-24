import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { PersonHeat } from '../../models/person-heat.model';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';


@Component({
    selector: 'personheat-edit',
    templateUrl: 'personheat-edit.component.html',
    styleUrls: ['personheat-edit.component.css']
})
export class PersonHeatEditComponent {
    personHeat = new PersonHeat();
    heats: Heat[] = new Array<Heat>();
    people: Person[] = new Array<Person>();
    scales = ['RX', 'SCALED'];

    constructor(private personService: PersonService, private heatService: HeatService, private dialog: MdDialog) {
        heatService.heats.subscribe(heat => {
            this.heats = heat;
        });
        personService.people.subscribe(people => {
            this.people = people;
        });
        personService.personHeat.subscribe(person => {
            this.personHeat = person;
        });
    }

    editPersonHeat() {
        this.personService.editPersonHeat();
    }

    deletePersonHeat() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === '1') {
                this.personService.deletePersonHeat(this.personHeat.id);
            }
        });
    }
}