import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('svgDrawingBoard', { static: false, read: ElementRef })
  drawingBoard: ElementRef;
  constructor(private cdf: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdf.detectChanges();
  }

  /////////////////////////
}
