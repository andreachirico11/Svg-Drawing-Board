import {
  AfterViewInit,
  Directive,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Rect, SVG, Svg } from '@svgdotjs/svg.js';
import { BoardStateService } from '../services/boardStateService/boardStateService';
import { shapeTypes } from '../ultils/svgFigures.type';

@Directive({
  selector: '[drawDirective]',
  // providers: [BoardStateService],
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
    const newS = this.boardStateService.addShape(event);
    this.board.add(newS);
  }

  @HostListener('mousemove', ['$event'])
  private drag(event: MouseEvent) {
    if (this.drawStarted) {
      let shapeToUpdate = this.board.findOne(
        this.boardStateService.getShapeUnderEditID
      ) as shapeTypes;
      const updatedShape = this.boardStateService.updateShape(
        event,
        shapeToUpdate
      );
      shapeToUpdate = updatedShape;
    }
  }

  @HostListener('mouseup', ['$event'])
  private end(event: MouseEvent) {
    this.drag(event);
    this.boardStateService.stopeEditing();
    this.drawStarted = false;
  }

  private getShapeById(id: string): shapeTypes {
    return SVG(id) as shapeTypes;
  }
}
