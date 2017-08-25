import { Component } from '@angular/core';
import { HeatService } from '../../services/heat.service';
import { Heat } from '../../models/heat.model';

@Component({
    selector: 'heat-add',
    templateUrl: 'heat-add.component.html',
    styleUrls: ['heat-add.component.css']
})
export class HeatAddComponent {
    heat: Heat = new Heat();

    constructor(private heatService: HeatService) {
        this.heatService.newHeat.subscribe(heat => {
            this.heat = heat;
        });
    }

    addHeat() {
        this.heatService.addHeat(this.heat);
    }
}