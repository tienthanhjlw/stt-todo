import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

const TODOS_STORAGE_KEY = 'todos';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
	private selectedTodos$ = new BehaviorSubject<number[]>([]);

  constructor() {
    this.loadTodos();
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

	getSelectedTodos(): Observable<number[]> {
		return this.selectedTodos$.asObservable();
	}

  addTodo(todo: Omit<Todo, 'id'>): void {
    const newTodo = { ...todo, id: Date.now() };
    this.todos.push(newTodo);
    this.updateTodos();
  }

  updateTodo(id: number, updates: Partial<Todo>): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...updates };
      this.updateTodos();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.updateTodos();
  }

	toggleTodoSelection(todoId: number): void {
    const currentSelected = this.selectedTodos$.value;
    const index = currentSelected.findIndex(t => t === todoId);
    
    if (index > -1) {
      currentSelected.splice(index, 1);
    } else {
      currentSelected.push(todoId);
    }

    this.selectedTodos$.next([...currentSelected]);
  }

  clearSelectedTodos(): void {
    this.selectedTodos$.next([]);
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    this.todosSubject.next(this.todos);
  }

  private updateTodos(): void {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(this.todos));
    this.todosSubject.next(this.todos);
  }
}