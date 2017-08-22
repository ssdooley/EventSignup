import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { PersonHeat } from '../../models/person-heat.model';
import { Heat } from '../../models/heat.model';
import { HeatService } from '../../services/heat.service';


@Component({
    selector: 'personheat-add',
    templateUrl: 'personheat-add.component.html',
    styleUrls: ['personheat-add.component.css']
})
export class PersonHeatAddComponent {
    personHeat = new PersonHeat();
    heats: Heat[] = new Array<Heat>();
    people: Person[] = new Array<Person>();
    scales = ['RX', 'SCALED'];

    constructor(private personService: PersonService, private heatService: HeatService) {
        heatService.heats.subscribe(heat => {
            this.heats = heat;
        });
        personService.people.subscribe(people => {
            this.people = people;
        });
        personService.personHeat.subscribe(person => {
            this.personHeat = person;
        });
    }

    ngOnInit() {
        this.heatService.getHeats();
        this.personService.getAllPeople();
    }

    addPersonHeat() {
        this.personService.addPersonHeat();
    }
}
