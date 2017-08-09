import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Person } from '../models/person.model';
import { ToastrService } from './toastr.service';

@Injectable()
export class PersonService {
    peopleSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Array<Person>>([]);
    get personData(): Person[] {
        return this.peopleSubject.value;
    }

    constructor(private http: Http, private toastrService: ToastrService) { }

    private personSubject = new Subject<Person>();
    private newPersonSubject = new Subject<Person>();

    person = this.personSubject.asObservable();
    people = this.peopleSubject.asObservable();
    newPerson = this.newPersonSubject.asObservable();

    setPerson(person: Person): void {
        this.personSubject.next(person);
    }

    getPeople(): void {
        this.http.get('api/Person/GetPeople')
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(people => {
                this.peopleSubject.next(people);
            },
            error => {
                this.toastrService.alertDanger(error, "Get People Error");
            });
    }

    getAllPeople(): void {
        this.http.get('api/Person/GetAllPeople')
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(people => {
                this.peopleSubject.next(people);
            },
            error => {
                this.toastrService.alertDanger(error, "Get All People Error");
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
