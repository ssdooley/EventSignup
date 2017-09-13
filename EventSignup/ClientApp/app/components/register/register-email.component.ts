import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
import { AddPersonDialogComponent } from '../dialog/add-person-dialog.component';

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

    @ViewChild('filter') filter: ElementRef;

    scales = ['RX', 'SCALED'];
    sexes = ['male', 'female'];

    constructor(private personService: PersonService,
        private heatService: HeatService,
        private dialog: MdDialog,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const check = params.get('id');
            if (check) {
                this.heatService.getHeat(Number.parseInt(check)).subscribe(heat => {
                    this.personService.personHeat.value.heat = heat;
                });
            }
        });

        Observable.fromEvent(this.filter.nativeElement, 'keyup' || 'change')
            .debounceTime(100)
            .distinctUntilChanged()
            .subscribe(() => {
                this.emailSearch(this.filter.nativeElement.value);
            });
    }

    emailSearch(email: string) {
        this.personService.findPerson(email).subscribe(person => {
            this.isRegistered = person.id > 0 ? true : false;
            this.personService.personHeat.value.person = person;
        });
    }

    registerEmail(person: Person) {
        this.personService.behaviorPerson.next(person);
        const dialogRef = this.dialog.open(AddPersonDialogComponent);
        this.filter.nativeElement.value = '';
        dialogRef.afterClosed().subscribe(result => {
            this.filter.nativeElement.value = this.personService.behaviorPerson.value.email;
            this.emailSearch(this.filter.nativeElement.value);
        });
    }    
}