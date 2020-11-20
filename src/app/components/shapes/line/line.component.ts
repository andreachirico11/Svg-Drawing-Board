import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'line',
  templateUrl: './line.svg',
})
export class LineComponent implements OnInit {
  x1 = 0;
  x2 = 50;
  y1 = 0;
  y2 = 50;
  stroke = 'black';

  @ViewChild('line', { read: TemplateRef, static: true })
  shapeViewRef: TemplateRef<LineComponent>;

  constructor() {}

  ngOnInit(): void {}
}
