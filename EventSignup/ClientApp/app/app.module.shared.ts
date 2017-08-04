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


export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        PrismComponent,
        HeatsComponent,
        HeatsListComponent
    ],
    providers: [
        ThemeService,
        ToastrService,
        HeatService
    ],
    imports: [
        AppMaterialModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
