import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Validators, FormControl } from '@angular/forms';

import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { PersonHeat } from '../../models/person-heat.model';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';
import { AddPersonHeatEmailDialogComponent } from '../dialog/add-personheat-email-dialog.component';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;



@Component({
    selector: 'register-person',
    templateUrl: 'register-email.component.html',
    styleUrls: ['register-email.component.css'],
})
export class RegisterEmailComponent {
    isRegistered = false;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);
    personHeat = new PersonHeat();
    personCheck = new BehaviorSubject<Person>(new Person());
    person = new Person();
    heat = new Heat();
    heats: Array<Heat> = new Array<Heat>();
    people: Array<Person> = new Array<Person>();
    @ViewChild('filter') filter: ElementRef;
    scales = [
        'RX',
        'SCALED'
        ]

    private selectedId: number;


    constructor(
        private personService: PersonService,
        private heatService: HeatService,
        private dialog: MdDialog,
        private router: Router) {
        this.heatService.getHeats();
        personService.people.subscribe(people => {
            this.people = people;
        });
        personService.personHeat.subscribe(person => {
            this.personHeat = person;
        });
        heatService.heats.subscribe(heats => {
            this.heats = heats;
        });

    }

    ngOnInit() {
        this.personService.getAllPeople();

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                this.testSearch(this.filter.nativeElement.value);
            });
    }

    isSelected(person: Person) {
        return person.id === this.selectedId;
    }

    addHeat(id) {
        if (this.personCheck.value.id > 0) {

            this.personService.personHeat.next(id);
            const dialogRef = this.dialog.open(AddPersonHeatEmailDialogComponent)

            //this.router.navigate(['/admin/', this.personCheck.value.id]);
        }
    }

    addPersonHeat() {
        this.personService.personHeat.value.person = new Person();
        this.personService.personHeat.value.person.id = this.personCheck.value.id;
        this.personService.addPersonHeat();
    }

    testSearch(email: string) {
        this.personService.findPerson(email).subscribe(person => {
            this.isRegistered = person.id > 0 ? true : false;
            this.personCheck.next(person);
        });
    }
}