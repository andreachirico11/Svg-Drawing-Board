import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ImgDownloaderService } from 'src/app/services/imgDownloaderService/img-downloader.service';
import { ReadyLink } from 'src/app/services/imgDownloaderService/readyLink';
import { ImgFileType, imgFileValues } from 'src/app/ultils/fileType';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-board-downloader-form',
  templateUrl: './board-downloader-form.component.html',
  styleUrls: ['./board-downloader-form.component.scss'],
})
export class BoardDownloaderFormComponent implements OnInit {
  @Input() drawingBoard: ElementRef;
  @Input() boardReady = false;

  public formats = [...imgFileValues];
  public chosenFormat: ImgFileType;
  public dialogRef: MatDialogRef<MatDialogComponent>;
  public dialogConfig: MatDialogConfig = {
    height: 'fit-content',
    width: 'fit-content',
  };
  readyLinkObj: any;

  constructor(
    private dialog: MatDialog,
    private imgDownloaderService: ImgDownloaderService
  ) {}

  ngOnInit(): void {
    /////////////////////////////////testing
    // setTimeout(() => {
    //   this.chosenFormat = 'png';
    //   this.extractImg();
    //   setTimeout(() => {
    //     this.readyLinkObj.download();
    //   }, 100);
    // }, 150);
    ///////////////////////////////
  }

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
  ////////
}
