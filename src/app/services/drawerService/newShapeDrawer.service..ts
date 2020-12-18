import {
  ArrayXY,
  Line,
  Path,
  PathArray,
  Point,
  PointArray,
  Polyline,
} from '@svgdotjs/svg.js';
import { SvgCoordinates } from 'src/app/ultils/coordinates';
import { shapes, shapeTypes } from '../../ultils/svgFigures.type';

export class ShapeDrawerService {
  private shapeCreator: (pointArr: PointArray) => shapeTypes;

  public startCollector(startEvent: MouseEvent): Polyline {
    const start = this.getRealMousePosition(startEvent);
    return this.polylineCreator(new PointArray([start.x, start.y]));
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
      case shapes.path:
        this.shapeCreator = this.pathCreator;
        this.shapeCreator = this.pathCreator2;
        break;
      case shapes.line:
        this.shapeCreator = this.lineCreator;
        break;
      case shapes.polyline:
      default:
        this.shapeCreator = this.polylineCreator;
        break;
    }
  }

  private getRealMousePosition(event: MouseEvent): SvgCoordinates {
    let ctm = (event.target as SVGGraphicsElement).getScreenCTM();
    if (ctm) {
      return new SvgCoordinates(
        Math.round((event.clientX - ctm.e) / ctm.a),
        Math.round((event.clientY - ctm.f) / ctm.d)
      );
    }
    return null;
  }

  private lineCreator(pointArr: PointArray): Line {
    return new Line()
      .plot(...pointArr[0], ...pointArr[pointArr.length - 1])
      .stroke({ width: 5, color: 'red' });
  }
  //

  //POLYLINE
  private polylineCreator(pointArr: PointArray): Polyline {
    return new Polyline()
      .plot(pointArr)
      .stroke({ width: 5, color: 'grey' })
      .fill('none');
  }

  // PATH
  private pathCreator(pointArr: PointArray): Path {
    let pathArr: PathArray;
    pointArr.forEach((point, i) => {
      const [x, y] = point;
      if (i === 0) {
        pathArr = new PathArray(['M', x, y]);
        return;
      }
      const threshold = 5;
      if (i % threshold === 0) {
        // threshold
        const [futureX, futureY] = pointArr[i + threshold]
          ? pointArr[i + threshold]
          : pointArr[pointArr.length - 1];
        const [previousX, previousY] = pointArr[i - threshold]
          ? pointArr[i - threshold]
          : pointArr[0];

        if (
          this.changeDirectionDetector(
            previousX,
            previousY,
            x,
            y,
            futureX,
            futureY
          )
        ) {
          // cambia direzione -> curva
          const [middleX, middleY] = pointArr[i + Math.floor(threshold / 2)]
            ? pointArr[i + Math.floor(threshold / 2)]
            : [futureX, futureY];
          pathArr.push(['S', middleX, middleY, futureX, futureY]);
        } else {
          // direzione non cambia -> linea
          const deltaX = Math.abs(x - futureX),
            deltaY = Math.abs(y - futureY);
          if (
            pathArr[pathArr.length - 1][0] === 'L' &&
            (deltaX < threshold * 3 || deltaY < threshold * 3)
          ) {
            // differenza trascurabile, sovrascrive vecchia linea
            pathArr[pathArr.length - 1] = ['L', x, y];
          } else {
            // differenza quindi nuova linea
            pathArr.push(['L', x, y]);
          }
        }
      }
    });
    console.log(pathArr);

    return new Path()
      .plot(pathArr)
      .stroke({ width: 20, color: 'blue' })
      .fill('none');
  }

  // DA FINIRE
  private pathCreator2(pointArr: PointArray): Path {
    let pathArr: PathArray;
    let filteredArr = this.pointFilter(pointArr, 10);
    console.log(filteredArr);

    filteredArr.forEach((point, i) => {
      const [x, y] = point;
      if (i === 0) {
        pathArr = new PathArray(['M', x, y]);
        return;
      }
      const threshold = 5;
      // threshold
      const [futureX, futureY] = pointArr[i + threshold]
        ? pointArr[i + threshold]
        : pointArr[pointArr.length - 1];
      const [previousX, previousY] = pointArr[i - threshold]
        ? pointArr[i - threshold]
        : pointArr[0];

      if (
        this.changeDirectionDetector(
          previousX,
          previousY,
          x,
          y,
          futureX,
          futureY
        )
      ) {
        // cambia direzione -> curva
        const [middleX, middleY] = pointArr[i + Math.floor(threshold / 2)]
          ? pointArr[i + Math.floor(threshold / 2)]
          : [futureX, futureY];
        pathArr.push(['S', middleX, middleY, futureX, futureY]);
      } else {
        // direzione non cambia -> linea
        const deltaX = Math.abs(x - futureX),
          deltaY = Math.abs(y - futureY);
        if (
          pathArr[pathArr.length - 1][0] === 'L' &&
          (deltaX < threshold * 3 || deltaY < threshold * 3)
        ) {
          // differenza trascurabile, sovrascrive vecchia linea
          pathArr[pathArr.length - 1] = ['L', x, y];
        } else {
          // differenza quindi nuova linea
          pathArr.push(['L', x, y]);
        }
      }
    });
    console.log(pathArr);

    return new Path()
      .plot(pathArr)
      .stroke({ width: 20, color: 'blue' })
      .fill('none');
  }
  //
  /**
   *
   *
   *
   *
   *
   *
   *
   */
  private changeDirectionDetector(
    previousX,
    previousY,
    x,
    y,
    futureX,
    futureY
  ): boolean {
    const xAscending = previousX < x && x < futureX;
    const xDescending = previousX > x && x > futureX;
    const yAscending = previousY < y && y < futureY;
    const yDescending = previousY > y && y > futureY;
    return (xAscending && yAscending) ||
      (xAscending && yDescending) ||
      (xDescending && yAscending) ||
      (xDescending && yDescending)
      ? false
      : true;
  }
  /**
   *
   *
   *
   *
   */

  private pointFilter(pointArr: PointArray, threshold: number): PointArray {
    const filteredArray: ArrayXY[] = [];
    for (let i = 0; i < pointArr.length; i++) {
      if (i === 0 || i === pointArr.length - 1) {
        filteredArray.push(pointArr[i]);
        continue;
      }
      const [x, y] = pointArr[i],
        [lastPushedX, lastPushedY] = filteredArray[filteredArray.length - 1];
      if (
        Math.abs(x - lastPushedX) > threshold ||
        Math.abs(y - lastPushedY) > threshold
      ) {
        filteredArray.push(pointArr[i]);
      }
    }
    return new PointArray(filteredArray);
  }
  /////////////
}
