import { DataSource } from '@angular/cdk';
import { MdPaginator, MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { PersonHeat } from '../models/person-heat.model';
import { PersonService } from '../services/person.service';
import { Person } from '../models/person.model';

export class PersonHeatDataSource extends DataSource<any> {
    filterChange = new BehaviorSubject('');
    filteredData: Person[];
    get filter(): string { return this.filterChange.value; }
    set filter(filter: string) { this.filterChange.next(filter); }

    constructor(private personService: PersonService, private paginator: MdPaginator, private sort: MdSort) {
        super();
        this.filteredData = personService.personData.slice();
    }

    connect(): Observable<Person[]> {
        const displayDataChanges = [
            this.personService.peopleSubject,
            this.filterChange,
            this.paginator.page,
            this.sort.mdSortChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            this.filteredData = this.personService.personData.slice().filter((person: Person) => {
                const searchStr = person.firstName.toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });

            const sortedData = this.getSortedData(this.filteredData);

            let startIndex = this.paginator.pageIndex * this.paginator.pageSize;

            if (startIndex > this.filteredData.length) {
                startIndex = 0;
                this.paginator.pageIndex = 0;
            }

            return sortedData.slice().splice(startIndex, this.paginator.pageSize);
        });
    }

    disconnect() { }

    getSortedData(data: Person[]): Person[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        if (this.sort.active.toLowerCase() === 'firstName' ||
            this.sort.active.toLowerCase() === 'lastName') {
            this.sort.active = '';
            this.sort.direction = '';
            return data;
        }

        return data.slice().sort((a, b) => {
            let propertyA: number | string | Date = '';
            let propertyB: number | string | Date = '';

            switch (this.sort.active.toLowerCase()) {
                case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
                case 'lastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
            }
                const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
                const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

                return (propertyA < propertyB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        })
    }
}
