import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImgFileType } from 'src/app/ultils/fileType';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss'],
})
export class MatDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public format: ImgFileType = 'png') {}
}
