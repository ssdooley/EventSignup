import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Person } from '../models/person.model';
import { ToasterService } from './toaster.service';
import { HeatService } from './heat.service';
import { PersonHeat } from "../models/person-heat.model";
import { CoreApiService } from './core-api.service';

@Injectable()
export class PersonService {
    peopleSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Array<Person>>([]);
    get personData(): Person[] {
        return this.peopleSubject.value;
    }

    constructor(private http: Http, private toaster: ToasterService, private coreApi: CoreApiService, private heatService: HeatService) { }

    private personSubject = new Subject<Person>();
    private newPersonSubject = new Subject<Person>();

    person = this.personSubject.asObservable();
    people = this.peopleSubject.asObservable();
    newPerson = this.newPersonSubject.asObservable();
    personHeat = new BehaviorSubject<PersonHeat>(new PersonHeat());

    setPerson(person: Person): void {
        this.personSubject.next(person);
    }

    getAllPeople(): void {
        this.http.get('api/Person/GetAllPeople')
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(people => {
                this.peopleSubject.next(people);
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }

    addPerson(model: Person) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(model);

        if (this.validatePerson(model)) {
            this.http.post('api/Person/AddPerson', body, options)
                .map(res => {
                    return res;
                }).catch(this.handleError)
                .subscribe(res => {
                    this.toaster.sendSuccessMessage(`${model.userName} successfully added`);
                    this.getAllPeople();
                },
                error => {
                    this.toaster.sendErrorMessage(error);
                });
        }
    }

    editPerson(model: Person) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(model);

        if (this.validatePerson(model)) {
            this.http.post('/api/Person/EditPerson', body, options)
                .map(res => {
                    return res;
                }).catch(this.handleError)
                .subscribe(res => {
                    this.toaster.sendSuccessMessage(`${model.userName} successfully updated`);
                },
                error => {
                    this.toaster.sendErrorMessage(error);
                });
        }
    }

    deletePerson(id: number) {
        let body = JSON.stringify(id);

        return this.http.post('/api/Person/DeletePerson', body, this.coreApi.getRequestOptions())
            .map(this.coreApi.extractData)
            .catch(this.coreApi.handleError)
            .subscribe(res => {
                this.getAllPeople();
                this.toaster.sendSuccessMessage('Delete status successfull');
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }


    addPersonHeat() {
        let body = JSON.stringify(this.personHeat.value);

        return this.http.post('api/Person/AddPersonHeat', body, this.coreApi.getRequestOptions())
            .map(this.coreApi.extractData)
            .catch(this.coreApi.handleError)
            .subscribe(res => {
                this.toaster.sendSuccessMessage(`${this.personHeat.value.person.userName} successfully added to heat at ${this.personHeat.value.heat.time}`);
                this.personHeat.next(new PersonHeat());
                this.heatService.getHeats();
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }

    editPersonHeat() {
        let body = JSON.stringify(this.personHeat.value);

        return this.http.post('/api/Person/EditPersonHeat', body, this.coreApi.getRequestOptions())
            .map(this.coreApi.extractData)
            .catch(this.coreApi.handleError)
            .subscribe(res => {
                this.getAllPeople();
                this.toaster.sendSuccessMessage(`${this.personHeat.value.heat} successfully updated ${this.personHeat.value.person}`);
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }

    deletePersonHeat(id: number) {
        let body = JSON.stringify(id);

        return this.http.post('/api/Person/DeletePersonHeat', body, this.coreApi.getRequestOptions())
            .map(this.coreApi.extractData)
            .catch(this.coreApi.handleError)
            .subscribe(res => {
                this.getAllPeople();
                this.heatService.getHeats();
                this.toaster.sendSuccessMessage('Delete status successfully set');
            },
            error => {
                this.toaster.sendErrorMessage(error);
            });
    }

    private validatePerson(person: Person): boolean {
        if (!person.firstName) {
            this.toaster.sendErrorMessage('First Name must have a value');
            return false;
        }

        if (!person.lastName) {
            this.toaster.sendErrorMessage('Last Name must have a value');
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
            const err = body.error || body.Message || JSON.stringify(body);
            errMsg = `${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
