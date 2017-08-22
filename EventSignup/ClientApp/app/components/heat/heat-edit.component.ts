import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HeatService } from '../../services/heat.service';
import { Heat } from '../../models/heat.model';

@Component({
    selector: 'heat-edit',
    templateUrl: 'heat-edit.component.html',
    styleUrls: ['heat-edit.component.css']
})
export class HeatEditComponent implements OnInit {
    @Input() modalId: string;
    heat: Heat = new Heat();

    constructor(private heatService: HeatService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.heatService.heat.subscribe(heat => {
            this.heat = heat;
        });
        this.route.paramMap.subscribe(params => {
            this.heatService.getHeat(Number.parseInt(params.get('id')));
                });
    }

    editHeat() {
        this.heatService.editHeat(this.heat);
    }
}