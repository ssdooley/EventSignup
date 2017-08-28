import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MdPaginator, MdSort } from '@angular/material';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { PersonHeatDataSource } from '../../datasources/person-heat.datasource';
import { ConfirmDialogComponent } from '../../components/dialog/confirm-dialog.component';

@Component({
    selector: 'person-list',
    templateUrl: 'person-list.component.html',
    styleUrls: ['person-list.component.css'],
    providers: [PersonService]
})
export class PeopleListComponent {
    person = new Person();
    displayedColumns = ['firstName', 'lastName', 'sex', 'userName', 'email', 'menu']
    people: Array<Person> = new Array<Person>();
    dataSource: PersonHeatDataSource | null;
    @ViewChild(MdSort) sort: MdSort;
    @ViewChild(MdPaginator) paginator: MdPaginator;
    @ViewChild('filter') filter: ElementRef;

    constructor(private personService: PersonService, public dialog: MdDialog) {
        personService.people.subscribe(people => {
            this.people = people;
        });
    }

    ngOnInit() {
        this.personService.getAllPeople();
        this.dataSource = new PersonHeatDataSource(this.personService, this.paginator, this.sort);

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    deletePerson(id: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === '1') {
                this.personService.deletePerson(id);
            }
        });
    }
}