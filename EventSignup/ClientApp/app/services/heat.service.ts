﻿import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Heat } from '../models/heat.model';
import { ToastrService } from './toastr.service';

@Injectable()
export class HeatService {
    heatsSubject: BehaviorSubject<Heat[]> = new BehaviorSubject<Array<Heat>>([]);
    get heatData(): Heat[] {
        return this.heatsSubject.value;
    }

    constructor(private http: Http, private toastrService: ToastrService) { }

    private heatSubject = new Subject<Heat>();
    private newHeatSubject = new Subject<Heat>();

    heats = this.heatsSubject.asObservable();
    heat = this.heatSubject.asObservable();
    newHeat = this.newHeatSubject.asObservable();

    setHeat(heat: Heat): void {
        this.heatSubject.next(heat);
    }

    getHeats(): void {
        this.http.get('/api/Heat/GetHeats')
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(heats => {
                this.heatsSubject.next(heats);
            },
            error => {
                this.toastrService.alertDanger(error, "Get Heats Error");
            });
    }

    private extractData(res: Response) {
        return res.json() || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText} || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}