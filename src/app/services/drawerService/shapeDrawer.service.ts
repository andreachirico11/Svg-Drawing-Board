import { Line } from '@svgdotjs/svg.js';
import { SvgCoordinates } from 'src/app/ultils/coordinates';
import { shapes, shapeTypes } from '../../ultils/svgFigures.type';

export class ShapeDrawerService {
  private shapeCreator: (startCoo: SvgCoordinates) => shapeTypes;
  private shapeUpdater: (
    newCoo: SvgCoordinates,
    oldShape: shapeTypes
  ) => shapeTypes;

  public createShape(type: shapes, startEvent: MouseEvent): shapeTypes {
    this.setMethods(type);
    return this.shapeCreator(this.getRealMousePosition(startEvent));
  }

  public updateShape(
    type: shapes,
    newEvent: MouseEvent,
    oldShape: shapeTypes
  ): shapeTypes {
    this.setMethods(type);
    return this.shapeUpdater(this.getRealMousePosition(newEvent), oldShape);
  }

  private setMethods(shape: shapes): void {
    switch (shape) {
      case shapes.circle:
        break;
      case shapes.ellipse:
        break;
      case shapes.path:
        break;
      case shapes.rect:
        break;
      case shapes.line:
        this.shapeCreator = this.lineCreator;
        this.shapeUpdater = this.lineUpdater;
      default:
        break;
    }
  }

  private getRealMousePosition(event: MouseEvent): SvgCoordinates {
    let ctm = (event.target as SVGGraphicsElement).getScreenCTM();
    if (ctm) {
      return new SvgCoordinates(
        (event.clientX - ctm.e) / ctm.a,
        (event.clientY - ctm.f) / ctm.d
      );
    }
    return null;
  }

  // LINE
  private lineCreator(start: SvgCoordinates): Line {
    return new Line()
      .plot(start.x, start.y, start.x, start.y)
      .stroke({ width: 5, color: 'red' });
  }
  private lineUpdater(newCoo: SvgCoordinates, oldLine: Line): Line {
    const [x, y] = oldLine.plot()[0];
    oldLine.plot(x, y, newCoo.x, newCoo.y);
    return oldLine;
  }
  //

  /////////////
}
