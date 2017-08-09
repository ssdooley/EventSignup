import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from './app.module.material';

import { ThemeService } from './services/theme.service';
import { ToastrService } from './services/toastr.service';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { PrismComponent } from './components/prism/prism.component';


import { HeatService } from './services/heat.service';
import { HeatsComponent } from './components/heat/heats.component';
import { HeatsListComponent } from './components/heat/heats-list.component';

import { PersonService } from './services/person.service';
import { PeopleListComponent } from './components/person/person-list.component';


export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        PrismComponent,
        HeatsComponent,
        HeatsListComponent,
        PeopleListComponent
    ],
    providers: [
        ThemeService,
        ToastrService,
        HeatService,
        PersonService,
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
