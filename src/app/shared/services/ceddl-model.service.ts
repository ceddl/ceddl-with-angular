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
