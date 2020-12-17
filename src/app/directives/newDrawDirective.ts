import {
  AfterViewInit,
  Directive,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Polyline, Rect, SVG, Svg } from '@svgdotjs/svg.js';
import { BoardStateService } from '../services/boardStateService/newBoardStateService ';

@Directive({
  selector: '[drawDirective]',
})
export class DrawDirective implements OnInit, AfterViewInit {
  private board: Svg;
  private drawStarted = false;

  constructor(
    private vcRef: ViewContainerRef,
    private boardStateService: BoardStateService
  ) {}

  ngOnInit() {
    this.board = SVG(this.vcRef.element.nativeElement) as Svg;
  }

  ngAfterViewInit() {
    this.addBackground(this.board);
  }

  private addBackground(board: Svg) {
    board.add(
      new Rect({
        width: board.width(),
        height: board.height(),
      }).fill('white')
    );
  }

  @HostListener('mousedown', ['$event'])
  private start(event: MouseEvent) {
    this.drawStarted = true;
    const newS = this.boardStateService.startTrace(event);
    this.board.add(newS);
  }

  @HostListener('mousemove', ['$event'])
  private drag(event: MouseEvent) {
    if (this.drawStarted) {
      let shapeToUpdate = this.board.findOne(
        '#' + this.boardStateService.getShapeUnderEditID()
      ) as Polyline;
      const updatedShape = this.boardStateService.updateTrace(
        event,
        shapeToUpdate
      );
      shapeToUpdate = updatedShape;
    }
  }

  @HostListener('mouseup', ['$event'])
  private end(event: MouseEvent) {
    this.drag(event);
    this.out();
  }

  // @HostListener('mouseup', ['$event'])
  // private end(event: MouseEvent) {
  //   this.drag(event);
  //   this.boardStateService.stopEditing();
  //   this.drawStarted = false;
  // }

  @HostListener('mouseleave')
  private out() {
    if (this.drawStarted) {
      let finishedPoly = this.board.findOne(
        '#' + this.boardStateService.getShapeUnderEditID()
      ) as Polyline;
      this.board.add(this.boardStateService.stopAndCreate(finishedPoly));
      finishedPoly.remove();
      this.drawStarted = false;
    }
  }

  /**
   *
   *
   */
}
