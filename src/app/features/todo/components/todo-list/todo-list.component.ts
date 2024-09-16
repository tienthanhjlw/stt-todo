import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoBulkActionComponent } from "../todo-bulk-action/todo-bulk-action.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
		CommonModule,
		TodoItemComponent,
		TodoBulkActionComponent
	],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
	animations: [
		[
			trigger('fade', [
				state('void', style({ 
					opacity: 0,
					transform: 'translateX(-50px)'
				})),
				transition('void => *', [
					animate(600, style({
						opacity: 1,
						transform: 'translateX(0)'
					}))
				]),
				transition('* => void', [
					animate(600, style({
						opacity: 0,
						transform: 'translateX(100px)'
					}))
				])
			])
		]
	]
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos$ = this.todoService.getTodos().pipe(
      map(todos => todos.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA.getTime() - dateB.getTime();
      }))
    );
  }
}
