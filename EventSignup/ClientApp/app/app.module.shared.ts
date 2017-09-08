import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app.module.material';
import { CoreApiService } from './services/core-api.service';

import { ThemeService } from './services/theme.service';
import { ToasterService } from './services/toaster.service';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { PrismComponent } from './components/prism/prism.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog.component';
import { EditPersonDialogComponent } from './components/dialog/edit-person-dialog.component';
import { EditPersonHeatDialogComponent } from './components/dialog/edit-personheat-dialog.component';
import { AddPersonHeatEmailDialogComponent } from './components/dialog/add-personheat-email-dialog.component';

import { TimeService } from './services/time.service';

import { AdminComponent } from './components/admin/admin.component';
import { AdminListComponent } from './components/admin/admin-list.component';
import { PersonHeatAdminComponent } from './components/admin/personheat-admin.component';

import { HeatService } from './services/heat.service';
import { HeatsComponent } from './components/heat/heats.component';
import { HeatsListComponent } from './components/heat/heats-list.component';
import { HeatEditComponent } from './components/heat/heat-edit.component';
import { HeatAddComponent } from './components/heat/heat-add.component';
import { HeatAvailibilityComponent } from './components/heat/heat-availibility.component';

import { PersonService } from './services/person.service';
import { PeopleListComponent } from './components/person/person-list.component';
import { PersonAddComponent } from './components/person/person-add.component';
import { PersonHeatAddComponent } from './components/person/personheat-add.component';
import { PersonHeatEditComponent } from './components/person/personheat-edit.component';

import { RegisterEmailComponent } from './components/register/register-email.component';
import { EmailFilterPipe } from './components/filter/email.filter';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        PrismComponent,
        AdminComponent,
        AdminListComponent,
        PersonHeatAdminComponent,
        ConfirmDialogComponent,
        EditPersonDialogComponent,
        EditPersonHeatDialogComponent,
        AddPersonHeatEmailDialogComponent,
        HeatsComponent,
        HeatsListComponent,
        HeatEditComponent,
        HeatAddComponent,
        HeatAvailibilityComponent,
        PeopleListComponent,
        PersonAddComponent,
        PersonHeatAddComponent,
        PersonHeatEditComponent,
        RegisterEmailComponent,
        EmailFilterPipe
    ],
    entryComponents: [
        ConfirmDialogComponent,
        EditPersonHeatDialogComponent,
        AddPersonHeatEmailDialogComponent
    ],
    providers: [
        ThemeService,
        ToasterService,
        HeatService,
        PersonService,
        CoreApiService,
        TimeService
    ],
    imports: [
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            {
                path: 'admin', component: AdminComponent,
                children: [
                    { path: 'heats', component: HeatsComponent },
                    { path: 'heat-list', component: HeatsListComponent },
                    { path: 'heat-edit/:id', component: HeatEditComponent },
                    { path: 'personheat-add', component: PersonHeatAddComponent },
                    { path: 'personheat-edit', component: PersonHeatEditComponent },
                    { path: 'personheat-admin', component: PersonHeatAdminComponent },
                    { path: 'edit-person-dialog', component: EditPersonDialogComponent },
                    { path: 'people-list', component: PeopleListComponent },
                ]
            },
            { path: 'person-add', component: PersonAddComponent },
            { path: 'heat-availibility', component: HeatAvailibilityComponent },
            { path: 'register-email/:id', component: RegisterEmailComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
