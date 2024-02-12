import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemListComponent } from './todo-item-list.component';
import { MOCK_TASKLIST } from 'src/app/shared/testing/task-list.service.mock';

describe('TodoItemListComponent', () => {
  let component: TodoItemListComponent;
  let fixture: ComponentFixture<TodoItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemListComponent]
    });
    fixture = TestBed.createComponent(TodoItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit complete event when todo is valid', () => {
    component.todo = {...MOCK_TASKLIST.todos[0]};
    spyOn(component.complete, "emit");

    component.completeHandler({checked: true} as any);

    expect(component.todo).not.toBeNull();
    expect(component.complete.emit).toHaveBeenCalled();
  });
});
