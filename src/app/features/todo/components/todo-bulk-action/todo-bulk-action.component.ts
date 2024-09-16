import { Component, computed, inject, input } from '@angular/core';
import { TodoService } from '@features/todo/services/todo.service';

@Component({
  selector: 'app-todo-bulk-action',
  standalone: true,
  imports: [],
  templateUrl: './todo-bulk-action.component.html',
  styleUrl: './todo-bulk-action.component.scss'
})
export class TodoBulkActionComponent {

	todoService = inject(TodoService);
	selectedTodoIds: number[] = [];

	ngOnInit() {
		this.todoService.getSelectedTodos().subscribe(ids => {
			this.selectedTodoIds = ids;
		});
	}


	onClickRemove() {
		this.selectedTodoIds.forEach(id => this.todoService.deleteTodo(id));
	}
}
