import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { ImgDownloaderService } from './services/imgDownloaderService/img-downloader.service';
import { ReadyLink } from './services/imgDownloaderService/readyLink';
import { ImgFileType, imgFileValues } from './ultils/fileType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public formats = [...imgFileValues];
  public chosenFormat: ImgFileType;
  public dialogRef: MatDialogRef<MatDialogComponent>;
  public dialogConfig: MatDialogConfig = {
    height: 'fit-content',
    width: 'fit-content',
  };
  @ViewChild('svgDrawingBoard', { static: false, read: ElementRef })
  drawingBoard: ElementRef;
  readyLinkObj: any;
  constructor(
    private dialog: MatDialog,
    private imgDownloaderService: ImgDownloaderService
  ) {}

  openDialog() {
    this.dialogConfig.data = this.chosenFormat;
    this.dialog
      .open(MatDialogComponent, this.dialogConfig)
      .afterClosed()
      .subscribe((yesOrNo) => {
        if (yesOrNo) {
          this.readyLinkObj.download();
        }
        this.readyLinkObj.remove();
        this.readyLinkObj = null;
      });
  }

  extractImg() {
    const svgEl = this.drawingBoard.nativeElement.firstChild.firstChild;
    this.imgDownloaderService
      .downloadLinkCreator(svgEl, this.chosenFormat, 'Prova')
      .then((result: ReadyLink) => {
        this.readyLinkObj = result;
        this.openDialog();
      })
      .catch((err) => {
        alert(err);
      });
  }
}
