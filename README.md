# ceddl with angular

This is a Implementation example of ceddl-polyfill with angular. It demonstrates how you could use templating and ceddl data model to create a web frontend datalayer.

In version 0.9.9 typescript support was added to the polyfill. This demo app should give you an example of a typescript implementation.

Files that were changed to add a datalayer to the app:

* package.json
* src/app/app.module.ts
* src/app/shared/services/ceddl-model.service.ts
* src/app/shared/components/json-viewer/json-viewer.component.ts
* src/app/about/about.component.html
* src/app/app.component.ts
* src/app/footer/footer.component.ts
* src/app/home/home.component.html
* src/app/home/home.component.ts
* src/app/list/list.component.html
* src/app/list/list.component.ts
* src/app/list/todo/todo.component.html
* src/index.html


Data model that was implemented.
[Screenshot-2](screenshots/model.png)

```js
import {ceddl} from '@ceddl/ceddl-polyfill';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CeddlModelService {
    constructor() {}

    loadModels() {
        ceddl.modelFactory.create({
            key: 'page',
            root: true,
            fields: {
                category: {
                    type: ceddl.modelFactory.fields.StringField,
                    required: true,
                    pattern: 'homepage|about'
                }
            }
        });

        ceddl.modelFactory.create({
            key: 'todoItem',
            root: false,
            fields: {
                state: {
                    type: ceddl.modelFactory.fields.StringField,
                    required: true,
                    pattern: 'active|completed'
                },
                content: {
                    type: ceddl.modelFactory.fields.StringField,
                    required: true,
                },
                contentLength: {
                    type: ceddl.modelFactory.fields.NumberField,
                    required: true,
                }
            }
        });

        ceddl.modelFactory.create({
            key: 'todoList',
            root: true,
            fields: {
                itemsTotal: {
                    type: ceddl.modelFactory.fields.NumberField,
                    required: true,
                },
                itemsLeft: {
                    type: ceddl.modelFactory.fields.NumberField,
                    required: true,
                },
                items: {
                    type: ceddl.modelFactory.fields.ListField, // Note the ListField type here
                    foreignModel: 'todoItem', // Reference to the key of the sub model
                    required: false,
                },
                activeFilter: {
                    type: ceddl.modelFactory.fields.StringField,
                    required: true,
                    pattern: 'all|active|completed'
                }
            }
        });
    }
}

```

## Router code
```js
import { ceddl }  from '@ceddl/ceddl-polyfill';
.....
export class AppComponent {
    constructor(router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                ceddl.initialize();
            }
        });
    }
}
```

## Demo server.
Run `npm install` and `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##Releases

#### 08-Nov-2021 0.0.2 
- Bumped versions of dependencies to angular 12.
- convert tslint to eslint.
- add typescript implementation of json viewer.
- Converted polyfill implementation from scripts import to typescript imports. 

## Licence
ceddl-with-angular is [MIT licensed]()

## CEDDL-polyfill
Customer experience digital data layer polyfill. Bridging the gap between the ceddl spec's and the browsers.
For more information please visit [https://www.ceddlbyexample.com/](https://www.ceddlbyexample.com/)
