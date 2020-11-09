import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-board',
  templateUrl: './draw-board.component.html',
  styleUrls: ['./draw-board.component.scss'],
})
export class DrawBoardComponent implements OnInit {
  @Input() width: number = 600;
  @Input() height: number = 600;
  viewPort: string;
  board: SVGGraphicsElement;
  startPointX: number;
  startPointY: number;
  endPointX: number;
  endPointY: number;

  ngOnInit(): void {
    this.calcolateViewPort();
    this.board = document.querySelector<SVGGraphicsElement>('svg');
    this.addListeners();
  }

  addListeners() {
    this.board.onmousedown = this.startDrag;
    this.board.onmousemove = this.drag;
    this.board.onmouseup = this.endDrag;
    this.board.onmouseleave = this.endDrag;
  }

  calcolateViewPort() {
    this.viewPort = `0 0 ${this.width} ${this.height}`;
  }

  startDrag(event: MouseEvent) {
    console.log(event);
    let res = this.getMousePosition(event);
    this.startPointX = res.x;
    this.startPointY = res.y;
  }

  drag(event: MouseEvent) {}

  endDrag(event: MouseEvent) {}

  getMousePosition(event: MouseEvent) {
    let ctm = (event.target as SVGGraphicsElement).getScreenCTM();
    return {
      x: (event.clientX - ctm.e) / ctm.a,
      y: (event.clientY - ctm.f) / ctm.d,
    };
  }
}
