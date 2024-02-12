import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'hl-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() type: "sucess" | "error" = "sucess";
  @Input() title: string = "Title";
  @Input() message: string = "Message";

  icon = new Map<string, string>([
    ["sucess", "verified"],
    ["error", "dangerous"]
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogService: MatDialog) {
    if (this.data) {
      this.type = this.data.type;
      this.title = this.data.title;
      this.message = this.data.message;
    }
  }

  get typeIcon() {
    return this.icon.get(this.type) || "info";
  }

  close(): void {
    this.dialogService.closeAll();
  }
}
