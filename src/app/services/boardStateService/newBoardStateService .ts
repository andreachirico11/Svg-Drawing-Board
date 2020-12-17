import { Polyline } from '@svgdotjs/svg.js';
import { shapes, shapeTypes } from 'src/app/ultils/svgFigures.type';
import { ShapeDrawerService } from '../drawerService/newShapeDrawer.service.';

export class BoardStateService {
  private shapeDrawerService = new ShapeDrawerService();

  private _shapeSelected: shapes;
  public set shapeSelector(newS: shapes) {
    this._shapeSelected = newS;
  }
  private _shapeUnderEditID = '';
  getShapeUnderEditID() {
    return this._shapeUnderEditID || '';
  }
  /**
   *
   *
   *
   */
  public startTrace(startEvent: MouseEvent): Polyline {
    this._shapeUnderEditID = this.shapeIdGenerator(this._shapeSelected);
    const trace = this.shapeDrawerService.startCollector(startEvent);
    trace.id(this._shapeUnderEditID);
    return trace;
  }
  public updateTrace(event: MouseEvent, old: Polyline): Polyline {
    return this.shapeDrawerService.updateCollector(event, old);
  }
  public stopAndCreate(old: Polyline): shapeTypes {
    this._shapeUnderEditID = '';
    return this.shapeDrawerService.createShape(this._shapeSelected, old);
  }

  private shapeIdGenerator(shape: shapes): string {
    const random = Math.floor(Math.random() * 100).toString();
    return shape + random;
  }
}
