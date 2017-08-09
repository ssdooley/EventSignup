import { Component, OnInit } from '@angular/core';
import { HeatService } from '../../services/heat.service';
import { MdTableModule } from '@angular/material';

@Component({
    selector: 'heats',
    templateUrl: 'heats.component.html',
    styleUrls: ['heats.component.css']
})
export class HeatsComponent implements OnInit {
    displayedColumns = ['firstName', 'lastName', 'email','sex','rxEvent']
    constructor(private heatService: HeatService) { }

    ngOnInit() {
        this.heatService.getHeats();
    }
}