import { Component, OnInit } from '@angular/core';
import { HeatService } from '../../services/heat.service';

@Component({
    selector: 'heats',
    templateUrl: 'heats.component.html',
    styleUrls: ['heats.component.css']
})
export class HeatsComponent implements OnInit {
    constructor(private heatService: HeatService) { }

    ngOnInit() {
        this.heatService.getHeats();
    }
}