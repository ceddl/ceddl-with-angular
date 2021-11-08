import { APP_INITIALIZER, NgModule } from '@angular/core';

import { HomeModule } from './home/';

import { AppComponent } from './app.component';

import { TodoStore } from './shared/services/todo.store';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './shared/interceptors/noopinterceptor.interceptor';
import { CeddlModelService } from './shared/services/ceddl-model.service';
import { JsonViewerComponent } from './shared/components/json-viewer/json-viewer.component';
import { CommonModule } from '@angular/common';

// Load the ceddl data models and provide it to the Angular bootstrapping
const appInitializerFn = (models: CeddlModelService) => () => models.loadModels();

/**
 * The bootstrapper module
 */
@NgModule({
    declarations: [
        AppComponent,
        JsonViewerComponent
    ],
    imports: [
        CommonModule,
        HomeModule,
        AppRoutingModule
    ],
    providers: [
        CeddlModelService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFn,
            multi: true,
            deps: [CeddlModelService],
        },
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
