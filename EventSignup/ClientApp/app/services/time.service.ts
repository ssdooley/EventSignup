import { Injectable } from '@angular/core';
import { Hour } from '../models/hour.model';
import { Minute } from '../models/minute.model';


@Injectable()
export class TimeService {
    hours = new Array<number>();
    minutes = new Array<number>();

    constructor() {
        for (let i = 6; i < 18; i++) {
            this.hours.push(i);
        }

        for (let i = 0; i < 60; i += 15) {
            this.minutes.push(i);
        }
    }
}