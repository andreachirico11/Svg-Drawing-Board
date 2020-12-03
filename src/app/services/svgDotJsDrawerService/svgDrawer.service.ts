import { Injectable } from '@angular/core';
import { Line } from '@svgdotjs/svg.js';
import { SvgCoordinates } from 'src/app/ultils/coordinates';
import { shapes, shapeTypes } from './svgFigures.type';

@Injectable()
export class SvgDrawerService {
  // private _selectedShape: shapeTypes;
  private createShapeCallback: (
    start: SvgCoordinates,
    end: SvgCoordinates
  ) => shapeTypes;
  public set selectedShape(newS: shapes) {
    switch (newS) {
      case shapes.line:
      default:
        this.createShapeCallback = (start, end) => {
          return new Line()
            .plot(start.x, start.y, end.x, end.y)
            .stroke({ width: 5, color: 'red' });
        };
        break;
    }
  }

  // fare con observables

  public createShape(start: SvgCoordinates, end: SvgCoordinates): shapeTypes {
    return this.createShapeCallback(start, end);
  }

  /////////////
}
