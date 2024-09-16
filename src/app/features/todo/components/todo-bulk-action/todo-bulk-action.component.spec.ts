import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBulkActionComponent } from './todo-bulk-action.component';

describe('TodoBulkActionComponent', () => {
  let component: TodoBulkActionComponent;
  let fixture: ComponentFixture<TodoBulkActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoBulkActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoBulkActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
