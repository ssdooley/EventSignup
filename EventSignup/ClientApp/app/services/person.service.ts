import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { Person } from '../models/person.model';
import { ToasterService } from './toaster.service';
import { HeatService } from './heat.service';
import { PersonHeat } from "../models/person-heat.model";
import { CoreApiService } from './core-api.service';

@Injectable()
export class PersonService {
    peopleSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Array<Person>>([]);
    peopleHeatsSubject: BehaviorSubject<PersonHeat[]> = new BehaviorSubject<Array<PersonHeat>>([]);
    get personData(): Person[] {
        return this.peopleSubject.value;
    }
    get personHeatData(): PersonHeat[] {
        return this.peopleHeatsSubject.value;
    }

    constructor(private http: Http, private toaster: ToasterService, private coreApi: CoreApiService, private heatService: HeatService) { }

    private personSubject = new Subject<Person>();
    private newPersonSubject = new Subject<Person>();

    person = this.personSubject.asObservable();
    people = this.peopleSubject.asObservable();
    newPerson = this.newPersonSubject.asObservable();
    behaviorPerson = new BehaviorSubject<Person>(new Person());

    personHeat = new BehaviorSubject<PersonHeat>(new PersonHeat());

    setPerson(person: Person): void {
        this.personSubject.next(person);
    }

    getPerson(id: number): Observable<Person> {
        return this.http.get('api/Person/GetPerson/' + id)
            .map(this.extractData)
            .catch(this.handleError);
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

    addPerson(model: Person): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(model);

        if (this.validatePerson(model)) {
            return this.http.post('api/Person/AddPerson', body, options)
                .map(res => {
                    return res;
                }).catch(this.handleError);
        }
    }

    addSuccessful(model: Person) {
        this.toaster.sendSuccessMessage(`${model.userName} successfully added`);
        this.behaviorPerson.next(model);
        this.getAllPeople();
    }

    addFailed(error) {
        this.toaster.sendErrorMessage(error);
    }

    findPerson(email: string): Observable<Person> {
        return this.http.get('/api/person/findPerson/' + email)
            .map(res => {
                try {
                    return res.json() || {};
                } catch (error) {
                    return res;
                }
            })
            .catch(this.handleError);
    }

    editPerson() {
        let body = JSON.stringify(this.behaviorPerson.value);

        return this.http.post('/api/Person/EditPerson', body, this.coreApi.getRequestOptions())
                .map(this.coreApi.extractData)
                .catch(this.coreApi.handleError)
                .subscribe(res => {
                    this.toaster.sendSuccessMessage(this.behaviorPerson.value.userName + ' successfully updated');
                },
                error => {
                    this.toaster.sendErrorMessage(error);
                });
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

    getPersonHeat(id: number):Observable<PersonHeat> {
        let body = JSON.stringify(this.personHeat.value);
        return this.http.get('api/Person/GetPersonHeat' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addPersonHeat() {
        let body = JSON.stringify(this.personHeat.value);

        return this.http.post('api/Person/AddPersonHeat', body, this.coreApi.getRequestOptions())
            .map(this.coreApi.extractData)
            .catch(this.coreApi.handleError)
            .subscribe(res => {
                this.toaster.sendSuccessMessage(`${this.personHeat.value.person.email} was successfully added to the ${this.personHeat.value.heat.name} heat`);
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
                this.toaster.sendSuccessMessage(`Heat successfully updated for ${this.personHeat.value.person.userName}`);
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

        if (!person.sex) {
            this.toaster.sendErrorMessage('Please select a Gender for this event');
            return false;
        }

        if (!person.email) {
            this.toaster.sendErrorMessage('Please enter a valid email address');
            return false;
        }

        if (!person.userName) {
            person.userName = person.firstName + "." + person.lastName
            this.toaster.sendErrorMessage('We have assigned a User Name for you');
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
