import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HeatService } from '../../services/heat.service';
import { Heat } from '../../models/heat.model';

@Component({
    selector: 'heat-edit',
    templateUrl: 'heat-edit.component.html',
    styleUrls: ['heat-edit.component.css']
})
export class HeatEditComponent {
    heats: Array<Heat> = new Array<Heat>();
    heat: Heat = new Heat();


    constructor(private route: ActivatedRoute, private heatService: HeatService) {
        heatService.heats.subscribe(heats => {
            this.heats = heats;
        });

        heatService.getHeats();
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.heatService.getHeat(Number.parseInt(params.get('id')));
        });
    }

    editHeat() {
        this.heatService.updateHeat();
    }
}