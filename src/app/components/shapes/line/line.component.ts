import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'line',
  templateUrl: './line.svg',
})
export class LineComponent implements OnInit {
  x1 = 0;
  x2 = 0;
  y1 = 50;
  y2 = 50;
  stroke = 'black';

  constructor() {}

  ngOnInit(): void {}
}
