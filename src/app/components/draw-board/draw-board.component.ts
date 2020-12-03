import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Svg, SVG, SvgType } from '@svgdotjs/svg.js';
import { SvgDrawerService } from 'src/app/services/svgDotJsDrawerService/svgDrawer.service';
import { shapes } from 'src/app/services/svgDotJsDrawerService/svgFigures.type';
import { SvgCoordinates } from 'src/app/ultils/coordinates';

@Component({
  selector: 'app-draw-board',
  templateUrl: './draw-board.component.html',
  styleUrls: ['./draw-board.component.scss'],
  providers: [SvgDrawerService],
})
export class DrawBoardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() width: number = 600;
  @Input() height: number = 600;
  viewPort: string;
  board: Svg;
  startCoordinates: SvgCoordinates;
  endCoordinates: SvgCoordinates;
  mouseEvents = ['mousedown', 'mousemove', 'mouseup'];
  drawStarted = false;
  eventsSubs = [];

  @ViewChild('newSvgAppendRef', { read: ViewContainerRef })
  innerSvgViewContRef: ViewContainerRef;

  constructor(
    private container: ElementRef,
    private renderer: Renderer2,
    private drawService: SvgDrawerService
  ) {}

  ngOnInit(): void {
    this.calcolateViewPort();
    this.board = SVG<Svg>(this.container.nativeElement.firstChild) as Svg;

    // configuro il service er disegnare linee
    this.drawService.selectedShape = shapes.line;
  }

  ngAfterViewInit() {
    // this.eventsSubs = [

    //   // this.renderer.listen(this.board, this.mouseEvents[0], (ev) =>
    //   //   this.startDrag(ev)
    //   // ),
    //   // this.renderer.listen(this.board, this.mouseEvents[1], (ev) =>
    //   //   this.drag(ev)
    //   // ),
    //   // this.renderer.listen(this.board, this.mouseEvents[2], (ev) =>
    //   //   this.endDrag(ev)
    //   // ),

    // ];
    this.board.on(this.mouseEvents[0], (ev) => this.startDrag(ev));
    this.board.on(this.mouseEvents[1], (ev) => this.drag(ev));
    this.board.on(this.mouseEvents[2], (ev) => this.endDrag(ev));
  }

  ngOnDestroy() {
    // if (this.eventsSubs.length > 0) {
    //   this.eventsSubs.forEach((sub) => sub());
    // }
  }

  private calcolateViewPort() {
    this.viewPort = `0 0 ${this.width} ${this.height}`;
  }

  private startDrag(event: MouseEvent) {
    const realCoordinates = this.getMousePosition(event);
    if (!realCoordinates) {
      alert('Bad Starting Point');
      return;
    }
    this.drawStarted = true;
    this.startCoordinates = new SvgCoordinates(
      realCoordinates.x,
      realCoordinates.y
    );
  }

  private drag(event: MouseEvent) {
    if (this.drawStarted) {
      let { x, y } = this.getMousePosition(event);
      this.endCoordinates = new SvgCoordinates(x, y);
      // crea e aggiungi linea
      this.board.add(
        this.drawService.createShape(this.startCoordinates, this.endCoordinates)
      );
    }
  }

  private endDrag(event: MouseEvent) {
    // this.drawService.stopDrawing();
    this.drawStarted = false;
  }

  private getMousePosition(event: MouseEvent) {
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
