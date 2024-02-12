import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodosPage } from './pages/todos/todos.page';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { TodoItemListComponent } from './components/todo-item-list/todo-item-list.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      CreateTodoComponent,
      TodosPage,
      DialogComponent,
      TodoItemListComponent,
      AlertComponent
    ],
    imports: [
      MatButtonModule,
      MatIconModule,
      MatChipsModule,
      MatDialogModule,
      MatInputModule,
      ReactiveFormsModule,
      MatDialogModule,
      HttpClientModule,
      MatDividerModule,
      MatListModule,
      MatCheckboxModule
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'task-list'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('task-list');
  });
});
