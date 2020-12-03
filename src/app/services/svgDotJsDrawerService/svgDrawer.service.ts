import { ViewContainerRef } from '@angular/core';
import { SvgCoordinates } from 'src/app/ultils/coordinates';
import { ShapeType } from 'src/app/ultils/shapeType';

export class SvgDrawerService {
  //   svg = SVG()
  //     .addTo('body')
  //     .add(new Rect({ width: 100, height: 100 }).fill('red'));

  public drawComponent(
    selectedShape: ShapeType,
    svgTarget: ViewContainerRef,
    startCoo: SvgCoordinates,
    endCoo: SvgCoordinates
  ) {}

  public stopDrawing(): void {}

  /////////////
}
