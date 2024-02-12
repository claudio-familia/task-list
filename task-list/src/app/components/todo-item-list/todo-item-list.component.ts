import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Tasklist } from 'src/app/models/tasklist.interface';

@Component({
  selector: 'hl-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.scss']
})
export class TodoItemListComponent {
  @Input() todo?: Tasklist;
  @Output() delete = new EventEmitter<Tasklist>
  @Output() complete = new EventEmitter<Tasklist>

  constructor() { }

  completeHandler($event: MatCheckboxChange): void {
    if  (this.todo) {
      this.todo.isCompleted = $event.checked;
      this.complete.emit({...this.todo, isCompleted: $event.checked, completedAt: new Date()});
    }
  }
}
