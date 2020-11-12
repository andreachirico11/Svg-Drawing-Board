import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { CatSvgComponent } from './components/cat-svg/cat-svg.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { SvgTestComponent } from './components/svg-test-component/svg-test.component';
import { DrawBoardComponent } from './components/draw-board/draw-board.component';
import { BoardLauncherFormComponent } from './components/board-launcher-form/board-launcher-form.component';
import { AngularMaterialModule } from './angular-material.module';
=======
import { SvgTestComponent } from './svg-test-component/svg-test.component';
import { BoardDownloaderFormComponent } from './components/board-downloader-form/board-downloader-form.component';
>>>>>>> origin/master

@NgModule({
  declarations: [
    AppComponent,
    CatSvgComponent,
    MatDialogComponent,
    SvgTestComponent,
<<<<<<< HEAD
    DrawBoardComponent,
    BoardLauncherFormComponent,
=======
    BoardDownloaderFormComponent,
>>>>>>> origin/master
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
  ],
  providers: [],
  entryComponents: [MatDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
