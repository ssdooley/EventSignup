import { Component, OnInit } from '@angular/core';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';
import { PersonService } from '../../services/person.service';
import { PersonHeat } from '../../models/person-heat.model';
import { Person } from "../../models/person.model";


@Component({
    selector: 'admin-list',
    templateUrl: 'admin-list.component.html',
    styleUrls: ['admin-list.component.css'],
    providers: [PersonService]
})
export class AdminListComponent implements OnInit {
        personHeat: PersonHeat;
        people: Person[];
    heats: Array<Heat> = new Array<Heat>();
    peopleHeats: Array<PersonHeat> = new Array<PersonHeat>();
    displayedColumns = ['firstName', 'lastName', 'email', 'sex', 'rxEvent']


    constructor(private personService: PersonService,
        private heatService: HeatService)
    {
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
    
}
