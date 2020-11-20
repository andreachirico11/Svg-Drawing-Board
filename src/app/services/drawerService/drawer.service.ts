import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { LineComponent } from 'src/app/components/shapes/line/line.component';
import { ShapeComponents } from 'src/app/components/shapes/shapeComponents';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private chosenComponentFactory: ComponentFactory<ShapeComponents>; // metterci un type con tutte le forme
  private actualComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public drawComponent(
    svgTarget: ViewContainerRef,
    // svgTarget: TemplateRef<any>,
    startCoo?: Coordinates,
    Endcoo?: Coordinates
  ) {
    this.generateSelectedShapeComponent();
    this.actualComponent = svgTarget.createComponent(
      this.chosenComponentFactory
    );
    // this.actualComponent = svgTarget.createEmbeddedView(
    //   this.createComponent().shapeViewRef
    // );
  }

  createComponent() {
    return new LineComponent();
  }

  private generateSelectedShapeComponent() {
    this.chosenComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      LineComponent
    );
  }
}
