import { Component } from '@angular/core';
import { TodoLayoutComponent } from "./components/todo-layout/todo-layout.component";
import { TodoCreateComponent } from "./components/todo-create/todo-create.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoFormComponent } from "./components/todo-form/todo-form.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    TodoLayoutComponent,
    TodoCreateComponent,
    TodoListComponent,
    TodoFormComponent
],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
