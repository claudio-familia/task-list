import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoComponent } from './create-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskListService } from 'src/app/services/task-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MOCK_TASKLIST } from 'src/app/shared/testing/task-list.service.mock';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let dialogService: MatDialog;
  let taskListService: TaskListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTodoComponent, DialogComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [TaskListService]
    });
    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogService = TestBed.inject(MatDialog);
    taskListService = TestBed.inject(TaskListService);
    spyOn(dialogService, "closeAll");
    spyOn(dialogService, "open");
    spyOn(taskListService, "create").and.returnValue(of({...MOCK_TASKLIST.todos[0]}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute closeAll method from dialogService when cancel is run', () => {
    component.cancel();

    expect(dialogService.closeAll).toHaveBeenCalled();
  });

  it('should call subscription add when createItem is executed', () => {
    component.todoForm = {
      value: { title: "Some title", description: "Some desc" }
    } as any;
    spyOn(component.subscriptions, "add");

    component.createItem();

    expect(component.subscriptions.add).toHaveBeenCalled();
  });

  it('should call create method from taskListServicewhen createItem is executed', () => {
    component.todoForm = {
      value: { title: "Some title", description: "Some desc" }
    } as any;

    component.createItem();

    expect(taskListService.create).toHaveBeenCalled();
  });
  it('should call create method from taskListServicewhen createItem is executed', () => {
    component.todoForm = {
      value: { title: "Some title", description: "Some desc" }
    } as any;

    component.createItem();

    expect(dialogService.open).toHaveBeenCalled();
  });
});
