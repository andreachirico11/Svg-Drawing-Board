import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-draw-board',
  templateUrl: './draw-board.component.html',
  styleUrls: ['./draw-board.component.scss'],
})
export class DrawBoardComponent implements OnInit, OnDestroy {
  @Input() width: number = 600;
  @Input() height: number = 600;
  viewPort: string;
  board: SVGGraphicsElement;
  startPointX: number;
  startPointY: number;
  endPointX: number;
  endPointY: number;
  mouseEvents = ['mousedown', 'mousemove', 'mouseup'];
  drawStarted = false;
  eventsSubs = [];

  constructor(private container: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.calcolateViewPort();
    this.board = this.container.nativeElement.firstChild;
    this.eventsSubs = [
      this.renderer.listen(this.board, this.mouseEvents[0], this.startDrag),
      this.renderer.listen(this.board, this.mouseEvents[1], this.drag),
      this.renderer.listen(this.board, this.mouseEvents[2], this.endDrag),
    ];
  }

  ngOnDestroy() {
    if (this.eventsSubs.length > 0) {
      this.eventsSubs.forEach((sub) => sub());
    }
  }

  calcolateViewPort() {
    this.viewPort = `0 0 ${this.width} ${this.height}`;
  }
  startDrag(event: MouseEvent) {
    console.info('start');
    let { x, y } = this.getMousePosition(event);
    this.drawStarted = true;
    this.startPointX = x;
    this.startPointY = y;
  }
  drag(event: MouseEvent) {
    if (this.drawStarted) {
      console.info('move');
      let { x, y } = this.getMousePosition(event);
      this.endPointX = x;
      this.endPointY = y;
    }
  }
  endDrag(event: MouseEvent) {
    if (this.drawStarted) {
      console.info('end');
      this.drawStarted = false;
      let { x, y } = this.getMousePosition(event);
      this.endPointX = x;
      this.endPointY = y;
    }
    // più roba per completare
  }

  getMousePosition(event: MouseEvent) {
    let ctm = (event.target as SVGGraphicsElement).getScreenCTM();
    return {
      x: (event.clientX - ctm.e) / ctm.a,
      y: (event.clientY - ctm.f) / ctm.d,
    };
  }
}
