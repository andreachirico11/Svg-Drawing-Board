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
import { DrawerService } from 'src/app/services/drawerService/drawer.service';
import { SvgDrawerService } from 'src/app/services/svgDotJsDrawerService/svgDrawer.service';
import { SvgCoordinates } from 'src/app/ultils/coordinates';

@Component({
  selector: 'app-draw-board',
  templateUrl: './draw-board.component.html',
  styleUrls: ['./draw-board.component.scss'],
  providers: [{ provide: DrawerService, useClass: SvgDrawerService }],
})
export class DrawBoardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() width: number = 600;
  @Input() height: number = 600;
  fill = 'blue';
  viewPort: string;
  board: SVGGraphicsElement;
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
    private drawService: DrawerService
  ) {}

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

  drag(event: MouseEvent) {
    if (this.drawStarted) {
      let { x, y } = this.getMousePosition(event);
      this.endCoordinates = new SvgCoordinates(x, y);
      this.drawService.drawComponent(
        'Line',
        this.innerSvgViewContRef,
        this.startCoordinates,
        this.endCoordinates
      );
    }
  }

  endDrag(event: MouseEvent) {
    this.drawService.stopDrawing();
    this.drawStarted = false;
  }

  getMousePosition(event: MouseEvent) {
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
