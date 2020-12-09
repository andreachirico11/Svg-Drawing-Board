import { waitForAsync } from '@angular/core/testing';
import { Line, SVG, Svg } from '@svgdotjs/svg.js';
import { shapes } from 'src/app/ultils/svgFigures.type';
import { ShapeDrawerService } from './shapeDrawer.service';

describe('drawerService', () => {
  let dService: ShapeDrawerService;
  let svg: SVGSVGElement;

  beforeEach(() => {
    dService = new ShapeDrawerService();
    svg = new Svg().node;
  });
  /**
   *
   */

  it(
    'can create a line correctly',
    waitForAsync(() => {
      svg.addEventListener('mousedown', (ev) => {
        const line = dService.createShape(shapes.line, ev) as Line;
        expect(line.x()).toBe(0);
        expect(line).toBeInstanceOf(Line);
        expect(line.stroke()).toBe('red');
      });
      svg.dispatchEvent(new MouseEvent('mousedown'));
    })
  );

  it(
    'can update a line correctly',
    waitForAsync(() => {
      const board = SVG().width(100).height(100);
      const prevLine = board.line(20, 30, 24, 41);
      // escono valori sballati
      board.node.addEventListener('mousemove', (ev) => {
        const updatedLine = dService.updateShape(shapes.line, ev, prevLine);
        console.log(prevLine.node);

        console.log(updatedLine.node);
        expect(updatedLine.x()).toBe(0);
      });
      board.node.dispatchEvent(new MouseEvent('mousemove'));
    })
  );
});
