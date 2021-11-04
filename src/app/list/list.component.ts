import { Component } from '@angular/core';

import { TodoStore } from '../shared/services/todo.store';

import { EmitterService } from '../shared/services/emitter.service';

import { Todo } from '../shared/models/todo.model';
import { of } from 'rxjs';

/**
 * The list of todos component
 *
 * Can filter types of todos :
 *
 * | Type | API |
 * | --- | --- |
 * | completed | displayCompleted |
 * | all | displayAll |
 * | remaining | displayRemaining |
 */
@Component({
    selector: 'list',
    providers: [],
    templateUrl: './list.component.html'
})
export class ListComponent {
    /**
     * Local reference of TodoStore
     */
    todoStore: TodoStore;
    todos: Array<Todo>;
    remaining: Array<Todo>;
    completed: Array<Todo>;
    activeFilter: string;
    watchTest;

    constructor(todoStore: TodoStore) {
        const that = this;
        this.todoStore = todoStore;
        this.todos = todoStore.getAll();
        this.activeFilter = 'all';
        this.watchTest = of(todoStore.todos);
        EmitterService.get('FooterComponent').subscribe(value => {
            console.log(value);
            switch (value) {
                case 'displayCompleted':
                    that.todos = todoStore.getCompleted();
                    that.activeFilter = 'completed';
                    break;
                case 'displayAll':
                    that.todos = todoStore.getAll();
                    that.activeFilter = 'all';
                    break;
                case 'displayRemaining':
                    that.todos = todoStore.getRemaining();
                    that.activeFilter = 'active';
                    break;
            }
        });
        this.watchTest.subscribe(data => {
            console.log(data);
        });
    }
}
