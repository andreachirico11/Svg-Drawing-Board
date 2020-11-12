import {
  AfterViewInit,
  Component,
  ElementRef,
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
export class DrawBoardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() width: number = 600;
  @Input() height: number = 600;
  fill = 'blue';
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
  }

  ngAfterViewInit() {
    this.eventsSubs = [
      this.renderer.listen(this.board, this.mouseEvents[0], (ev) =>
        this.startDrag(ev)
      ),
      this.renderer.listen(this.board, this.mouseEvents[1], (ev) =>
        this.drag(ev)
      ),
      this.renderer.listen(this.board, this.mouseEvents[2], (ev) =>
        this.endDrag(ev)
      ),
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
    console.warn('start');
    const realCoordinates = this.getMousePosition(event);
    if (!realCoordinates) {
      alert('Bad Starting Point');
      return;
    }
    this.drawStarted = true;
    this.startPointX = realCoordinates.x;
    this.startPointY = realCoordinates.y;
  }

  drag(event: MouseEvent) {
    if (this.drawStarted) {
      console.warn('drag');
      let { x, y } = this.getMousePosition(event);
      this.endPointX = x;
      this.endPointY = y;
    }
  }

  endDrag(event: MouseEvent) {
    if (this.drawStarted) {
      console.warn('end');
      this.drawStarted = false;
      let { x, y } = this.getMousePosition(event);
      this.endPointX = x;
      this.endPointY = y;
    }
    // più roba per completare
  }

  getMousePosition(event: MouseEvent) {
    console.log(event);

    let ctm = (event.target as SVGGraphicsElement).getScreenCTM();
    if (ctm) {
      return {
        x: (event.clientX - ctm.e) / ctm.a,
        y: (event.clientY - ctm.f) / ctm.d,
      };
    }
    return null;
  }
}
