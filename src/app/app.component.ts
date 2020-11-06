import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { ImgFileType, imgFileValues } from './ultils/fileType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public formats = [...imgFileValues];
  public chosenFormat = '';
  public dialogRef: MatDialogRef<MatDialogComponent>;
  public dialogConfig: MatDialogConfig = {
    height: 'fit-content',
    width: 'fit-content',
  };

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialogConfig.data = this.chosenFormat;
    this.dialog
      .open(MatDialogComponent, this.dialogConfig)
      .afterClosed()
      .subscribe((yesOrNo) => {
        alert(yesOrNo);
      });
  }
}
