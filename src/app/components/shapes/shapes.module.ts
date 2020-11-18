import { NgModule } from '@angular/core';
import { LineComponent } from './line/line.component';

const declarations = [LineComponent];

@NgModule({
  declarations: declarations,
  exports: declarations,
})
export class ShapesModule {}
