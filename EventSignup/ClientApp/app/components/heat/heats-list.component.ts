import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MdPaginator, MdSort, MdDialog } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';
import { PersonService } from '../../services/person.service';
import { PersonHeat } from '../../models/person-heat.model';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';


@Component({
    selector: 'heats-list',
    templateUrl: 'heats-list.component.html',
    styleUrls: ['heats-list.component.css'],
    providers: [PersonService]
})
export class HeatsListComponent implements OnInit {
    heats: Array<Heat> = new Array<Heat>();
    heat: Heat;
   

    private selectedId: number;
    peopleHeats: Array<PersonHeat> = new Array<PersonHeat>();
    


    constructor(
        private route: ActivatedRoute,
        private dialog: MdDialog,
        private router: Router,
        private personService: PersonService,
        private heatService: HeatService) {
            heatService.heats.subscribe(heats => {
                this.heats = heats;
            });
    }

    ngOnInit() {
        this.heatService.heat.subscribe(heat => {
            this.heat = heat;
        });
        this.route.paramMap.subscribe(params => {
            this.heatService.getHeat(Number.parseInt(params.get('id')));
        });

        this.heatService.getHeats;
    }

    isSelected(heat: Heat) {
        return heat.id === this.selectedId;
    }

    onSelect(heat: Heat) {
        this.heatService.editHeat.next(heat);
        this.selectedId = heat.id;
        this.router.navigate(['admin/heat-edit', heat.id]);
    }

    deleteHeat(id) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === '1') {
                this.heatService.deleteHeat();
            }
        });        
    }    
}