import { shapes, shapeTypes } from 'src/app/ultils/svgFigures.type';
import { ShapeDrawerService } from '../drawerService/shapeDrawer.service';

export class BoardStateService {
  private shapeDrawerService = new ShapeDrawerService();

  private _shapeSelected: shapes;
  public set shapeSelector(newS: shapes) {
    this._shapeSelected = newS;
  }
  private _shapeUnderEditID = '';
  get getShapeUnderEditID() {
    return this._shapeUnderEditID || '';
  }
  /**
   *
   *
   *
   */
  public addShape(startEvent: MouseEvent): shapeTypes {
    this._shapeUnderEditID = this.shapeIdGenerator(this._shapeSelected);
    const newS = this.shapeDrawerService.createShape(
      this._shapeSelected,
      startEvent
    );
    newS.id(this._shapeUnderEditID);
    return newS;
  }
  public updateShape(event: MouseEvent, oldShape: shapeTypes): shapeTypes {
    return this.shapeDrawerService.updateShape(
      this._shapeSelected,
      event,
      oldShape
    );
  }
  public stopeEditing(): void {
    this._shapeUnderEditID = '';
  }

  private shapeIdGenerator(shape: shapes): string {
    const random = Math.floor(Math.random() * 100).toString();
    return shape + random;
  }
}
