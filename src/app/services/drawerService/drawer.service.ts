import { ComponentType } from '@angular/cdk/portal';
import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { LineComponent } from 'src/app/components/shapes/line/line.component';
import { ShapeComponentType } from 'src/app/components/shapes/shapeComponents';
import { Coordinates } from 'src/app/ultils/coordinates';
import { ShapeType } from 'src/app/ultils/shapeType';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drownComponents: ShapeComponentType[] = [];
  private componentUnderDrawing: ShapeComponentType = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  public drawComponent(
    selectedShape: ShapeType,
    svgTarget: ViewContainerRef,
    startCoo: Coordinates,
    endCoo: Coordinates
  ) {
    if (this.componentUnderDrawing) {
      this.drownComponents.pop();
    } else {
      this.componentUnderDrawing = this.createComponent(selectedShape);
    }
    this.componentUnderDrawing.updateCoordinates(startCoo, endCoo);
    this.drownComponents.push(this.componentUnderDrawing);
    this.redrawBoard(svgTarget);
  }

  public stopDrawing(): void {
    this.drownComponents;

    this.componentUnderDrawing = null;
  }

  private redrawBoard(svgBoard: ViewContainerRef): void {
    svgBoard.clear();
    this.drownComponents.forEach((comp) => {
      svgBoard.createEmbeddedView(comp.shapeViewRef);
    });
  }

  private createComponent(selectedShape: ShapeType): ShapeComponentType {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      this.shapeToComponentConverter(selectedShape)
    );
    const comp = factory.create(this.injector).instance;
    return comp;
  }

  private idGenerator(component: ShapeComponentType): string {
    const random = Math.floor(Math.random() * 100).toString();
    return component.type + random;
  }

  private shapeToComponentConverter(
    type: ShapeType
  ): ComponentType<ShapeComponentType> {
    switch (type) {
      case 'Line':
        return LineComponent;
      default:
        return null;
    }
  }
}
