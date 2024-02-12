import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let dialogService: MatDialog

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [MatDialogModule, MatIconModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { type: "sucess", title: "title", message: "message"} },
      ]
    });
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogService = TestBed.inject(MatDialog);
    spyOn(dialogService, "closeAll");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute closeAll method from dialogService when close is run', () => {
    component.close();

    expect(dialogService.closeAll).toHaveBeenCalled();
  });

  it('should return info when typeIcon is not valid', () => {
    //@ts-ignore
    component.type = "invalid";

    expect(component.typeIcon).toBe("info");
  });
});
