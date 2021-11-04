import { NgModule } from '@angular/core';

import { HomeModule } from './home/';

import { AppComponent } from './app.component';

import { TodoStore } from './shared/services/todo.store';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './shared/interceptors/noopinterceptor.interceptor';

/**
 * The bootstrapper module
 */
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HomeModule,
        AppRoutingModule
    ],
    providers: [
        TodoStore,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NoopInterceptor,
          multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
