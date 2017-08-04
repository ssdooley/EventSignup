import { Component } from '@angular/core';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';

@Component({
    selector: 'heats-list',
    templateUrl: 'heats-list.component.html',
    styleUrls: ['heats-list.component.css']
})
export class HeatsListComponent {
    heats: Array<Heat> = new Array<Heat>();
    dates: Array<Date> = new Array<Date>();
    structuredHeats: [Array<Heat>, Date][] = new Array<[Array<Heat>, Date]>();

    constructor(private heatService: HeatService) {
        heatService.heats.subscribe(heats => {
            this.heats = heats;
            this.dates = heats.map((heat) => {
                if (this.dates.indexOf(heat.date) < 0) {
                    return heat.date;
                }
            });

            let structure = this.structuredHeats;

            for (var i = 0; i < this.dates.length; i++) {
                let dateHeats = heats.map((heat) => {
                    if (heat.date === this.dates[i]) {
                        return heat;
                    }
                });

                structure.push([dateHeats, this.dates[i]]);
            }

            this.structuredHeats = structure;
        });
    }
}