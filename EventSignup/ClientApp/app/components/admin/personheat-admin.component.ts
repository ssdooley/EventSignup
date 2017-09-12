import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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
import { PeopleHeatsDataSource } from '../../datasources/people-heats.datasource';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';
import { EditPersonHeatDialogComponent } from '../dialog/edit-personheat-dialog.component';

@Component({
    selector: 'personheat-admin',
    templateUrl: 'personheat-admin.component.html',
    styleUrls: ['personheat-admin.component.css']
})
export class PersonHeatAdminComponent implements OnInit {
    personHeat = new PersonHeat();
    heats: Array<Heat> = new Array<Heat>();
    people: Person[] = new Array<Person>();
    displayedColumns = ['lastName', 'sex', 'email', 'rxEvent', 'partnerName', 'partnerSex', 'partnerRxEvent', 'comments']
    peopleHeats: Array<PersonHeat> = new Array<PersonHeat>();
    scales = ['RX', 'SCALED'];

    private selectedId: number;


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

    isSelected(personHeat: PersonHeat) {
        return personHeat.id === this.selectedId;
    }

    onSelect(personHeat: PersonHeat) {
        this.personService.personHeat.next(personHeat);
        const dialogRef = this.dialog.open(EditPersonHeatDialogComponent)
        dialogRef.afterClosed().subscribe(result => {
            if (result === '1') {
                this.personService.getAllPeople();
                this.heatService.getHeats();
            }
        });
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
