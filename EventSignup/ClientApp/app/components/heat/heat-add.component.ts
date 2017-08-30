import { Component, Input, OnInit } from '@angular/core';
import { HeatService } from '../../services/heat.service';
import { Heat } from '../../models/heat.model';
import { TimeService } from '../../services/time.service';

@Component({
    selector: 'heat-add',
    templateUrl: 'heat-add.component.html',
    styleUrls: ['heat-add.component.css']
})
export class HeatAddComponent {
    heat: Heat = new Heat();
    selectedDate: number = Date.now();


    constructor(private heatService: HeatService, private time: TimeService) {
        this.heatService.newHeat.subscribe(heat => {
            this.heat = heat;
        });
    }

    addHeat() {
        this.heatService.addHeat(this.heat);
    }
}