import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonHeat } from '../../models/person-heat.model';
import { Heat } from '../../models/heat.model';
import { PersonService } from '../../services/person.service';
import { HeatService } from '../../services/heat.service';
import { Person } from '../../models/person.model';

@Component({
    selector: 'heat-availibility',
    templateUrl: 'heat-availibility.component.html',
    styleUrls: ['heat-availibility.component.css']
})
export class HeatAvailibilityComponent {
    heats: Array<Heat> = new Array<Heat>();
    people: Array<Person> = new Array<Person>();
    personHeat = new PersonHeat;
    available: number;
    

    constructor(
        private personService: PersonService,
        private heatService: HeatService, ) {
        this.heatService.getHeats();
        this.personService.getAllPeople();
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
        this.heatService.getHeats();
    }
}