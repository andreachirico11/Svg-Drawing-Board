import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-downloader-form',
  templateUrl: './board-downloader-form.component.html',
  styleUrls: ['./board-downloader-form.component.scss'],
})
export class BoardDownloaderFormComponent implements OnInit {
  public formats = [...imgFileValues];
  public chosenFormat: ImgFileType;
  public dialogRef: MatDialogRef<MatDialogComponent>;
  public dialogConfig: MatDialogConfig = {
    height: 'fit-content',
    width: 'fit-content',
  };

  constructor(
    private dialog: MatDialog,
    private imgDownloaderService: ImgDownloaderService
  ) {}

  ngOnInit(): void {}
}
