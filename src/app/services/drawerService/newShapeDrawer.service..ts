import { Line, PointArray, Polyline } from '@svgdotjs/svg.js';
import { SvgCoordinates } from 'src/app/ultils/coordinates';
import { shapes, shapeTypes } from '../../ultils/svgFigures.type';

export class ShapeDrawerService {
  private shapeCreator: (pointArr: PointArray) => shapeTypes;

  public startCollector(startEvent: MouseEvent): Polyline {
    const start = this.getRealMousePosition(startEvent);
    return new Polyline()
      .plot([
        [start.x, start.y],
        [start.x, start.y],
      ])
      .stroke({ width: 5, color: 'red' })
      .fill('none');
  }

  public updateCollector(startEvent: MouseEvent, oldLine: Polyline): Polyline {
    const newCoo = this.getRealMousePosition(startEvent);
    return oldLine.plot([...oldLine.array(), [newCoo.x, newCoo.y]]);
  }

  public createShape(type: shapes, oldPoly: Polyline): shapeTypes {
    this.setMethods(type);
    return this.shapeCreator(oldPoly.array());
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
        break;
      case shapes.polyline:
      default:
        this.shapeCreator = (pointArr) => new Polyline().plot(pointArr);
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

  // // PATH
  // private pathCreator(start: SvgCoordinates): Path {
  //   const pathString = `M ${start.x} ${start.y} C ${start.x} ${start.y} ${start.x} ${start.y} ${start.x} ${start.y}`;
  //   return new Path()
  //     .plot(pathString)
  //     .stroke({ width: 5, color: 'red' })
  //     .fill('none');
  // }
  // private pathUpdater(newCoo: SvgCoordinates, oldPath: Path): Path {
  //   const prevArray = oldPath.array();
  //   console.log('prev', prevArray);
  //   let curvePoints = [...prevArray[1]];
  //   let newPoints = [
  //     ...curvePoints.slice(0, 3),
  //     ...curvePoints.slice(-2),
  //     newCoo.x,
  //     newCoo.y,
  //   ];
  //   console.log(newPoints);
  //   // prevArray[1] = newPoints;
  //   // if (oldPath[1]) {
  //   //   prevArray.push(['C', newCoo.x, newCoo.y, newCoo.x, newCoo.y,newCoo.x, newCoo.y]);
  //   // } else {
  //   //   prevArray[1].push(newCoo.y as never);
  //   //   prevArray[1].push(newCoo.x as never);
  //   // }
  //   return oldPath.plot(
  //     [prevArray[0], newPoints].map((arr) => arr.join(' ')).join(' ')
  //   );
  // }
  // //

  /////////////
}
