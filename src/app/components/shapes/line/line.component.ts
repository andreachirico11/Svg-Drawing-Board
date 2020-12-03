import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SvgCoordinates } from 'src/app/ultils/coordinates';
import { ShapeType } from 'src/app/ultils/shapeType';

@Component({
  selector: 'line-comp',
  templateUrl: './line.svg',
})
export class LineComponent implements OnInit {
  x1 = 0;
  x2 = 50;
  y1 = 0;
  y2 = 50;
  stroke = 'black';
  strokeWidth = '5';
  type: ShapeType = 'Line';

  private _componentId: string;
  get componentId() {
    return this._componentId;
  }
  set componentId(newId) {
    if (!this._componentId) {
      this._componentId = newId;
    }
  }

  updateCoordinates(startCoo: SvgCoordinates, endCoo: SvgCoordinates): void {
    this.x1 = startCoo.x;
    this.y1 = startCoo.y;
    this.x2 = endCoo.x;
    this.y2 = endCoo.y;
  }

  @ViewChild('line', { read: TemplateRef, static: true })
  shapeViewRef: TemplateRef<LineComponent>;

  ngOnInit(): void {}
}
