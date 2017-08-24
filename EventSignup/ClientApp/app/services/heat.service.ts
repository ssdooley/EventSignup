import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Heat } from '../models/heat.model';
import { ToasterService } from './toaster.service';
import { CoreApiService } from './core-api.service';

@Injectable()
export class HeatService {
    heatsSubject: BehaviorSubject<Heat[]> = new BehaviorSubject<Array<Heat>>([]);
    get heatData(): Heat[] {
        return this.heatsSubject.value;
    }

    constructor(private http: Http, private toaster: ToasterService, private coreApi: CoreApiService) { }

    editHeat = new BehaviorSubject<Heat>(new Heat());

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
                this.toaster.sendErrorMessage(error);
            });
    }

    getHeat(id: number): Observable<Heat> {
        return this.http.get('api/Heat/GetHeat/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addHeat(model: Heat) {
        let body = JSON.stringify(model.id);

        return this.http.post('/api/Heat/AddHeat', body, this.coreApi.getRequestOptions())
            .map(this.coreApi.extractData)
            .catch(this.coreApi.handleError)
            .subscribe(res => {
                this.getHeats();
                this.toaster.sendSuccessMessage(model.name + ' ' + model.time + ' successfully updated');
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }

    updateHeat() {
        let body = JSON.stringify(this.editHeat.value);

        return this.http.post('/api/Heat/EditHeat', body, this.coreApi.getRequestOptions())
            .map(this.coreApi.extractData)
            .catch(this.coreApi.handleError)
            .subscribe(res => {
                this.getHeats();
                this.toaster.sendSuccessMessage(this.editHeat.value.name + ' ' + this.editHeat.value.time + ' successfully updated');
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }

    deleteHeat() {
        let body = JSON.stringify(this.editHeat.value.id);

        return this.http.post('/api/Heat/DeleteHeat', body, this.coreApi.getRequestOptions())
            .map(this.coreApi.extractData)
            .catch(this.coreApi.handleError)
            .subscribe(res => {
                this.getHeats();
                this.toaster.sendSuccessMessage('Delete status successfully set for ' + this.editHeat.value.name + ' - ' + this.editHeat.value.time);
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }

    private validateHeat(heat: Heat): boolean {
        if (!heat.name) {
            this.toaster.sendErrorMessage('Heat name must have a value');
            return false;
        }

        if (!heat.time) {
            this.toaster.sendErrorMessage('Heat time must have a value');
            return false;
        }

        return true;
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