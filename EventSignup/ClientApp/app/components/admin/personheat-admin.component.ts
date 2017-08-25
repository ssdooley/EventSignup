import { Component, OnInit } from '@angular/core';
import { MdPaginator, MdSort, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';
import { PersonService } from '../../services/person.service';
import { PersonHeat } from '../../models/person-heat.model';
import { Person } from '../../models/person.model';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';

@Component({
    selector: 'personheat-admin',
    templateUrl: 'personheat-admin.component.html',
    styleUrls: ['personheat-admin.component.css'],
    providers: [PersonService]
})
export class PersonHeatAdminComponent implements OnInit {
    personHeat = new PersonHeat();
    heats: Array<Heat> = new Array<Heat>();
    people: Person[] = new Array<Person>();
    peopleHeats: Array<PersonHeat> = new Array<PersonHeat>();
    displayedColumns = ['firstName', 'lastName', 'email', 'sex', 'rxEvent']
    scales = ['RX', 'SCALED'];


    constructor(private personService: PersonService, public dialog: MdDialog,
        private heatService: HeatService) {
        heatService.heats.subscribe(heats => {
            this.heats = heats;
        });
        personService.people.subscribe(people => {
            this.people = people;
        });
        personService.personHeat.subscribe(person => {
            this.personHeat = person;
        });
    }

    ngOnInit() {
        this.personService.getAllPeople();
        this.heatService.getHeats();
    }

    updatePersonHeat() {
        this.personService.editPersonHeat();
    }

    deletePersonHeat(id: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === '1') {
                this.personService.deletePersonHeat(id);
            }
        });
    }
}
