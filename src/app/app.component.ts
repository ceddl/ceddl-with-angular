declare var ceddl:any;
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

/**
 * The main component
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css',
        './app.component-ext.css'
    ]
})
export class AppComponent {
    constructor(router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                ceddl.initialize();
            }
        });

    }
}
