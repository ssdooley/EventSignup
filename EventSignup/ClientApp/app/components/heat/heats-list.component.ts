import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';
import { PersonService } from '../../services/person.service';
import { PersonHeat } from '../../models/person-heat.model';


@Component({
    selector: 'heats-list',
    templateUrl: 'heats-list.component.html',
    styleUrls: ['heats-list.component.css'],
    providers: [PersonService]
})
export class HeatsListComponent {
    heats: Array<Heat> = new Array<Heat>();
    peopleHeats: Array<PersonHeat> = new Array<PersonHeat>();
    displayedColumns = ['firstName', 'lastName', 'email', 'sex', 'rxEvent']


    constructor(private personService: PersonService,
                private heatService: HeatService) {
                    heatService.heats.subscribe(heats => {
                    this.heats = heats;
                });
    }
}