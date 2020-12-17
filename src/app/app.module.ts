import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MyCommsModule } from './mycomms.module';
import { BoardDownloaderFormComponent } from './components/board-downloader-form/board-downloader-form.component';
import { BoardLauncherFormComponent } from './components/board-launcher-form/board-launcher-form.component';
import { DrawBoardComponent } from './components/draw-board/draw-board.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { SvgTestComponent } from './components/svg-test-component/svg-test.component';
// import { DrawDirective } from './directives/drawDirective';
import { DrawDirective } from './directives/newDrawDirective';

@NgModule({
  declarations: [
    AppComponent,
    MatDialogComponent,
    SvgTestComponent,
    DrawBoardComponent,
    BoardLauncherFormComponent,
    BoardDownloaderFormComponent,
    DrawDirective,
  ],
  imports: [CommonModule, MyCommsModule],
  entryComponents: [MatDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
