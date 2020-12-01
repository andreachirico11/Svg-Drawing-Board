import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CatSvgComponent } from './components/cat-svg/cat-svg.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { SvgTestComponent } from './components/svg-test-component/svg-test.component';
import { DrawBoardComponent } from './components/draw-board/draw-board.component';
import { BoardLauncherFormComponent } from './components/board-launcher-form/board-launcher-form.component';
import { BoardDownloaderFormComponent } from './components/board-downloader-form/board-downloader-form.component';
import { ShapesModule } from './components/shapes/shapes.module';
import { CommonsModule } from './commons.module';
import { LineComponent } from './components/shapes/line/line.component';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule, CommonsModule, ShapesModule],
  providers: [], // spostarlo nell'entry del suo modulo
  entryComponents: [MatDialogComponent, LineComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
