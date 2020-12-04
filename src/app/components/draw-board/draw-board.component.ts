import { Component, Input, OnInit } from '@angular/core';
import { DrawDirective } from 'src/app/directives/drawDirective';
import { BoardStateService } from 'src/app/services/boardStateService/boardStateService';
import { shapes } from 'src/app/ultils/svgFigures.type';

@Component({
  selector: 'app-draw-board',
  templateUrl: './draw-board.component.html',
  styleUrls: ['./draw-board.component.scss'],
  providers: [BoardStateService, DrawDirective],
})
export class DrawBoardComponent implements OnInit {
  @Input() width: number = 600;
  @Input() height: number = 600;
  viewPort: string;

  constructor(private boardStateServce: BoardStateService) {}

  ngOnInit(): void {
    this.calcolateViewPort();
    // finchè c'è solo la line
    this.boardStateServce.shapeSelector = shapes.line;
  }

  private calcolateViewPort() {
    this.viewPort = `0 0 ${this.width} ${this.height}`;
  }
}
