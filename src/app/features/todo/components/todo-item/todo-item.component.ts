import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, inject, input, output, signal } from '@angular/core';
import { Todo } from '@features/todo/models/todo.model';
import { TodoService } from '@features/todo/services/todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [TodoFormComponent],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
	animations: [
		trigger('detail', [
			state('void', style({ height: '0px', opacity: '0' })),
			state('*', style({ height: '*', opacity: '1' })),
			transition('void => *', animate(500)),
			transition('* => void', animate(300)),
		]),
	],
})
export class TodoItemComponent {
	todoService = inject(TodoService);

	todo = input.required<Todo>();
	checked = output<void>();

	showDetail = signal(false);

	onToggle() {
		this.todoService.toggleTodoSelection(this.todo().id);
	}

	onDelete() {
		this.todoService.deleteTodo(this.todo().id);
	}

	onViewDetail() {
		this.showDetail.set(true);
	}

	onUdate(todoValue: Omit<Todo, 'id'>) {
		this.todoService.updateTodo(this.todo().id, {
			...todoValue
		});
		this.showDetail.set(false);
	}
}
