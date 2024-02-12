import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from '../../components/create-todo/create-todo.component';
import { TaskListService } from 'src/app/services/task-list.service';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Tasklist } from 'src/app/models/tasklist.interface';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ENVIRONMENT } from 'src/environments/environment';

@Component({
  selector: 'hl-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss']
})
export class TodosPage implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  todos: Tasklist[] = [];
  filteredTodos: Tasklist[] = [];
  pendings: boolean = true;
  completes: boolean = true;

  constructor(
    private dialogService: MatDialog,
    private tasklistService: TaskListService
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getTodos(): void {
    this.subscriptions.add(this.tasklistService.getAll().subscribe(
      (response: Tasklist[]) => {
        this.todos = response;
        this.filterTodos();
      }
    ));
  }

  filterTodos(): void {
    switch(true) {
      case this.pendings && this.completes: 
        this.filteredTodos = [...this.todos];
      break;
      case this.pendings: 
        this.filteredTodos = [...this.todos].filter(todo => !todo.isCompleted);
      break;
      case this.completes:
        this.filteredTodos = [...this.todos].filter(todo => todo.isCompleted);
      break;
      default:
        this.filteredTodos = [...this.todos];
    }
  }

  createTodo(): void {
    this.dialogService.open(CreateTodoComponent, {
      hasBackdrop: true,
      width: "80%",
      height: "26rem"
    });
  }

  trackList(index: number, todo: Tasklist): number {
    return todo.id || index;
  }

  deleteHandler($event: Tasklist) {
    if (!$event.id) return;

    this.subscriptions.add(this.tasklistService.delete($event.id).subscribe(() => {
      this.dialogService.open(AlertComponent, {
        ...ENVIRONMENT.alertDialog,
        data: {
          title: "Operation Sucessful",
          message: "The task has been deleted",
          type: "sucess"
        }
      }).afterClosed().subscribe(() => {
        this.getTodos();
      })

    }))
  }
  completeHandler($event: Tasklist) {
      if (!$event) return;

      this.subscriptions.add(this.tasklistService.update($event).subscribe());
  }
}
