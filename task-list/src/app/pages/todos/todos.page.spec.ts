import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosPage } from './todos.page';
import { TaskListService } from 'src/app/services/task-list.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { MOCK_TASKLIST } from 'src/app/shared/testing/task-list.service.mock';

describe('TodosPage', () => {
  let component: TodosPage;
  let fixture: ComponentFixture<TodosPage>;
  let dialogService: MatDialog;
  let tasklistService: TaskListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosPage],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatChipsModule,
        MatIconModule
      ],
      providers: [TaskListService],
    });
    fixture = TestBed.createComponent(TodosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogService = TestBed.inject(MatDialog);
    tasklistService = TestBed.inject(TaskListService);
    
    spyOn(component.subscriptions, "add");

    spyOn(tasklistService, "getAll").and.returnValue(of([...MOCK_TASKLIST.todos]));
    spyOn(tasklistService, "update").and.returnValue(of({...MOCK_TASKLIST.todos[0]}));
    spyOn(tasklistService, "delete").and.returnValue(of({...MOCK_TASKLIST.todos[0]}));
  
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    spyOn(dialogService, "open").and.returnValue(dialogRefMock);
    dialogRefMock.afterClosed.and.returnValue(of(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getAll todos on NgOnInit', () => {
    component.ngOnInit();

    expect(tasklistService.getAll).toHaveBeenCalled();
  });

  it('should save subscription reference in subscriptions when getTodos is executed', () => {
    component.getTodos();

    expect(component.subscriptions.add).toHaveBeenCalled();
  });

  it('should store response in todos variable when getTodos is executed', () => {
    component.getTodos();

    expect(component.todos.length).toBeGreaterThan(0);
  });

  it('should executed filterTodos when getTodos is executed', () => {
    spyOn(component, "filterTodos");
    
    component.getTodos();

    expect(component.filterTodos).toHaveBeenCalled();
  });

  it('should filter pendings todos when pendings prop is true and completes is false', () => {
    component.pendings = true;
    component.completes = false;
    
    // Also executes filter todos
    component.getTodos();

    const isAnyCompleted = component.todos.some(t => !t.isCompleted)

    expect(isAnyCompleted).toBeTruthy();
  });

  it('should filter completes todos when pendings prop is false and completes is true', () => {
    component.pendings = false;
    component.completes = true;
    
    // Also executes filter todos
    component.getTodos();

    const isAnyPending = component.todos.some(t => t.isCompleted)

    expect(isAnyPending).toBeTruthy();
  });

  it('should filter for all when pendings and completes props are invalids', () => {
    component.pendings = undefined as any;
    component.completes = undefined as any;
    
    // Also executes filter todos
    component.getTodos();

    const isAnyPending = component.todos.some(t => t.isCompleted)
    const isAnyCompleted = component.todos.some(t => !t.isCompleted)

    expect(isAnyPending && isAnyCompleted).toBeTruthy();
  });

  it('should execute open method from dialogService when createTodo is run', () => {
    component.createTodo();

    expect(dialogService.open).toHaveBeenCalled();
  });

  it('should return id when todo is Provided in trackList method', () => {
    const todo = MOCK_TASKLIST.todos[0];

    expect(component.trackList(0, todo)).toBe(todo.id as number);
  });

  it('should return index when todo is not Provided in trackList method', () => {
    const todo: any = {};
    expect(component.trackList(0, todo)).toBe(0);
  });

  it("should not execute subscriptions's add when event is not provided in deleteHandler Method", () => {
    const todo: any = {id: undefined};

    component.deleteHandler(todo);

    expect(component.subscriptions.add).not.toHaveBeenCalled();
  });

  
  it("should execute tasklistService's delete method and subscriptions's add when event is provided in deleteHandler Method", () => {
    const todo = MOCK_TASKLIST.todos[0];

    component.deleteHandler(todo);

    expect(tasklistService.delete).toHaveBeenCalled();
    expect(component.subscriptions.add).toHaveBeenCalled();
  });

  it("should not execute tasklistService's update method and subscriptions's add when event is not provided in completeHandler Method", () => {
    const todo: any = undefined;

    component.completeHandler(todo);

    expect(tasklistService.update).not.toHaveBeenCalled();
    expect(component.subscriptions.add).not.toHaveBeenCalled();
  });

  it("should execute tasklistService's update method and subscriptions's add when event is provided in completeHandler Method", () => {
    const todo = MOCK_TASKLIST.todos[0];

    component.completeHandler(todo);

    expect(tasklistService.update).toHaveBeenCalled();
    expect(component.subscriptions.add).toHaveBeenCalled();
  });
});
