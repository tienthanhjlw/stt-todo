import { Component } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [TodoFormComponent],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss'
})
export class TodoCreateComponent {
  constructor(private todoService: TodoService) {}

  onAddTodo(todo: Omit<Todo, 'id'>) {
    this.todoService.addTodo(todo);
  }
}
