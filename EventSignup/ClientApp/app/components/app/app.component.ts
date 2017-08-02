import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../models/theme.model';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    materialTheme: Theme;
    themes: Theme[] = new Array<Theme>();

    constructor(private themeService: ThemeService) {
        this.materialTheme = {
            id: 'green-app',
            display: 'Green'
        }
    }

    ngOnInit() {
        this.themes = this.themeService.getThemes();

        this.themeService.activeTheme.subscribe(theme => {
            this.materialTheme = theme;
        });
    }

    onActivate(e, mainContainer) {
        document.querySelector('div.mat-sidenav-content').scrollTop = 0;
    }

    setTheme(theme: Theme) {
        this.themeService.setTheme(theme);
    }
}
