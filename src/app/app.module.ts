import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { CatSvgComponent } from './components/cat-svg/cat-svg.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { SvgTestComponent } from './components/svg-test-component/svg-test.component';
import { DrawBoardComponent } from './components/draw-board/draw-board.component';
import { BoardLauncherFormComponent } from './components/board-launcher-form/board-launcher-form.component';
import { AngularMaterialModule } from './angular-material.module';
import { BoardDownloaderFormComponent } from './components/board-downloader-form/board-downloader-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CatSvgComponent,
    MatDialogComponent,
    SvgTestComponent,
    DrawBoardComponent,
    BoardLauncherFormComponent,
    BoardDownloaderFormComponent,
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
