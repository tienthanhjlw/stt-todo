import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./features/todo/todo.routes').then((m) => m.routes)
  },
  {
    path: '**',
    redirectTo: '/todo'
  }
];
