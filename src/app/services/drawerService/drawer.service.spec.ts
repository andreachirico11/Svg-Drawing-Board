import { TestBed } from '@angular/core/testing';

import { DrawerService } from './drawer.service';

describe('DrawerService', () => {
  let service: DrawerService;

  const svgEl: SVGElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  svgEl.setAttribute('width', '400');
  svgEl.setAttribute('height', '400');

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('it can draw a line ad attach it to svgBoard', () => {
    service.drawComponent(svgEl);
    expect(svgEl.firstChild.nodeName).toBe('line');
  });
});
