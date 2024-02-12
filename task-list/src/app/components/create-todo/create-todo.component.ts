import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Tasklist } from 'src/app/models/tasklist.interface';
import { TaskListService } from 'src/app/services/task-list.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ENVIRONMENT } from 'src/environments/environment';

@Component({
  selector: 'hl-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnDestroy {
  todoForm: FormGroup<{title: FormControl, description: FormControl}>;
  subscriptions = new Subscription();

  constructor(
    fb: FormBuilder,
    private dialogService: MatDialog,
    private tasklistService: TaskListService
  ) {
    this.todoForm = fb.group({
      title: ["", Validators.required],
      description: [""]
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  cancel(): void {
    this.dialogService.closeAll();
  }

  createItem(): void {
    const payload = <Tasklist>{...this.todoForm.value};
    this.subscriptions.add(this.tasklistService.create(payload).subscribe(
      () => {
        this.dialogService.open(AlertComponent, {
          ...ENVIRONMENT.alertDialog,
          data: {
            title: "Operation Sucessful",
            message: "The task has been created",
            type: "sucess"
          }
        })
      }
    ));
  }
}
