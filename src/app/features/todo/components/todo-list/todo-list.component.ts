import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { combineLatest, Observable } from 'rxjs';
import { TodoBulkActionComponent } from "../todo-bulk-action/todo-bulk-action.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
		CommonModule,
		ReactiveFormsModule,
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
	searchControl = new FormControl('');

  constructor(private todoService: TodoService) {}

  ngOnInit() {
		const search$ = this.searchControl.valueChanges.pipe(
			startWith(''),
			debounceTime(300),
			distinctUntilChanged()
		);
		
		this.todos$ = combineLatest([
			this.todoService.getTodos(),
			search$
		]).pipe(
			map(([todos, searchTerm]) => 
				todos
					.filter(todo => todo.title.toLowerCase().includes(searchTerm?.toLowerCase()?? ''))  // Filter by search term
					.sort((prevTodo, nextTodo) => {
						const dateA = new Date(prevTodo.dueDate);
						const dateB = new Date(nextTodo.dueDate);
						return dateA.getTime() - dateB.getTime();
					})
			)
		);
		
  }
}
