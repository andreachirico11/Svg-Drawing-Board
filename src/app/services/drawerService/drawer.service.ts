import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { LineComponent } from 'src/app/components/shapes/line/line.component';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private chosenComponentFactory: ComponentFactory<any>; // metterci un type con tutte le forme
  private actualComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public drawComponent(
    svgTarget: ViewContainerRef,
    startCoo?: Coordinates,
    Endcoo?: Coordinates
  ) {
    this.generateSelectedShapeComponent();
    this.actualComponent = svgTarget.createComponent(
      this.chosenComponentFactory
    );
  }

  private generateSelectedShapeComponent() {
    this.chosenComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      LineComponent
    );
  }
}
