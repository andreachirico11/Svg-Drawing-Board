import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CatSvgComponent } from './components/cat-svg/cat-svg.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { SvgTestComponent } from './components/svg-test-component/svg-test.component';
import { DrawBoardComponent } from './components/draw-board/draw-board.component';

@NgModule({
  declarations: [
    AppComponent,
    CatSvgComponent,
    MatDialogComponent,
    SvgTestComponent,
    DrawBoardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  providers: [],
  entryComponents: [MatDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
