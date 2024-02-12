import { Component, Input } from '@angular/core';

@Component({
  selector: 'hl-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Input() title: string = "";
}
