import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSliderModule,
  ],
  exports: [
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSliderModule,
  ],
})
export class AngularMaterialModule {}
