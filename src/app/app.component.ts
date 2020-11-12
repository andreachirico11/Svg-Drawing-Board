import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DrawBoardComponent } from './components/draw-board/draw-board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  boardReady = false;
  readyLinkObj: any;
  @ViewChild('svgDrawingBoard', { static: false, read: ElementRef })
  drawingBoard: ElementRef;
  @ViewChild('viewReference', { read: ViewContainerRef })
  boardContainerRef: ViewContainerRef;
  constructor(
    private cdf: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit() {
    this.cdf.detectChanges();
  }

  addNewBoard({ width, height }) {
    this.boardReady = true;
    const boardCompRef = this.boardContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(DrawBoardComponent)
    );
    boardCompRef.instance.width = width;
    boardCompRef.instance.height = height;
  }

  /////////////////////////
}
