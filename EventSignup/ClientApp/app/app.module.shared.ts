import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from './app.module.material';
import { CoreApiService } from './services/core-api.service';

import { ThemeService } from './services/theme.service';
import { ToasterService } from './services/toaster.service';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { PrismComponent } from './components/prism/prism.component';


import { HeatService } from './services/heat.service';
import { HeatsComponent } from './components/heat/heats.component';
import { HeatsListComponent } from './components/heat/heats-list.component';
import { HeatEditComponent } from './components/heat/heat-edit.component';

import { PersonService } from './services/person.service';
import { PeopleListComponent } from './components/person/person-list.component';
import { PersonAddComponent } from './components/person/person-add.component';
import { PersonHeatAddComponent } from './components/person/personheat-add.component';


export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        PrismComponent,
        HeatsComponent,
        HeatsListComponent,
        HeatEditComponent,
        PeopleListComponent,
        PersonAddComponent,
        PersonHeatAddComponent
    ],
    providers: [
        ThemeService,
        ToasterService,
        HeatService,
        PersonService,
        CoreApiService
    ],
    imports: [
        AppMaterialModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'people-list', component: PeopleListComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
