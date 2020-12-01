import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-board-launcher-form',
  templateUrl: './board-launcher-form.component.html',
  styleUrls: ['./board-launcher-form.component.scss'],
})
export class BoardLauncherFormComponent implements OnInit {
  min = 50;
  step = 50;
  widthMax;
  heightMax;
  widthSliderVal;
  heightSliderVal;

  @HostListener('window:resize')
  onResize() {
    this.calculateDimensions();
  }

  calculateDimensions() {
    this.widthMax = window.innerWidth - 100;
    this.heightMax = window.innerHeight - 100;
  }

  ngOnInit(): void {
    this.calculateDimensions();
    this.widthSliderVal = this.min;
    this.heightSliderVal = this.min;

    ////////////////testing
    // setTimeout(() => {
    //   this.widthSliderVal = 500;
    //   this.heightSliderVal = 500;
    //   this.addNew();
    // }, 100);
    /////////////
  }

  @Output() addNewEvent = new EventEmitter<{
    width: number;
    height: number;
  }>();

  addNew() {
    this.addNewEvent.emit({
      width: this.widthSliderVal,
      height: this.heightSliderVal,
    });
  }
}
