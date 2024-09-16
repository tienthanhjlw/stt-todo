import { Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoService } from './services/todo.service';

export const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
		providers: [TodoService]
  }
]
