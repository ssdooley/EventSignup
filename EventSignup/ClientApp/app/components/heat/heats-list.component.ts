import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';
import { PersonService } from '../../services/person.service';
import { PersonHeatDataSource } from '../../datasources/person-heat.datasource';


@Component({
    selector: 'heats-list',
    templateUrl: 'heats-list.component.html',
    styleUrls: ['heats-list.component.css'],
    providers: [PersonService]
})
export class HeatsListComponent implements AfterViewInit {
    heats: Array<Heat> = new Array<Heat>();
    displayedColumns = ['firstName', 'lastName', 'email', 'sex', 'rxEvent']
    dataSource: PersonHeatDataSource | null;
    @ViewChild(MdSort) sort: MdSort;
    @ViewChild(MdPaginator) paginator: MdPaginator;
    @ViewChild('filter') filter: ElementRef;


    constructor(private personService: PersonService,
                private heatService: HeatService) {
                    heatService.heats.subscribe(heats => {
                    this.heats = heats;
                });
    }

    ngAfterViewInit() {
        this.heatService.getHeats();
        this.dataSource = new PersonHeatDataSource(this.personService, this.paginator, this.sort);

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
}