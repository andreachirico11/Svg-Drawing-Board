<<<<<<< HEAD
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DrawBoardComponent } from './components/draw-board/draw-board.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { ImgDownloaderService } from './services/imgDownloaderService/img-downloader.service';
import { ReadyLink } from './services/imgDownloaderService/readyLink';
import { ImgFileType, imgFileValues } from './ultils/fileType';
=======
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
>>>>>>> origin/master

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
<<<<<<< HEAD
export class AppComponent {
  public formats = [...imgFileValues];
  public chosenFormat: ImgFileType;
  public dialogRef: MatDialogRef<MatDialogComponent>;
  public dialogConfig: MatDialogConfig = {
    height: 'fit-content',
    width: 'fit-content',
  };
  public boardReady: boolean = false;
  @ViewChild('svgDrawingBoard', { static: false, read: ElementRef })
  drawingBoard: ElementRef;
  @ViewChild('viewReference', { read: ViewContainerRef })
  boardContainerRef: ViewContainerRef;
  readyLinkObj: any;
  constructor(
    private dialog: MatDialog,
    private imgDownloaderService: ImgDownloaderService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
=======
export class AppComponent implements AfterViewInit {
  @ViewChild('svgDrawingBoard', { static: false, read: ElementRef })
  drawingBoard: ElementRef;
  constructor(private cdf: ChangeDetectorRef) {}
>>>>>>> origin/master

  ngAfterViewInit() {
    this.cdf.detectChanges();
  }

<<<<<<< HEAD
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

  addNewBoard({ width, height }) {
    this.boardReady = true;
    const boardCompRef = this.boardContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(DrawBoardComponent)
    );
    boardCompRef.instance.width = width;
    boardCompRef.instance.height = height;
  }
=======
  /////////////////////////
>>>>>>> origin/master
}
