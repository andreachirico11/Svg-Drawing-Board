import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImgDownloaderService } from 'src/app/services/imgDownloaderService/img-downloader.service';

import { DrawBoardComponent } from './draw-board.component';

describe('DrawBoardComponent', () => {
  let component: DrawBoardComponent,
    nativeElement: SVGElement,
    svgDebElem: DebugElement,
    fixture: ComponentFixture<DrawBoardComponent>,
    widthHeightExtractor = new ImgDownloaderService().extractSvgDimension,
    width,
    height,
    rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect'),
    ctm: SVGMatrix;
  /**
   *
   *
   *
   *
   */
  rect.setAttribute('x', '50');
  rect.setAttribute('y', '50');
  rect.setAttribute('width', '300');
  rect.setAttribute('height', '200');
  rect.style.fill = 'red';
  /**
   *
   *
   *
   *
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawBoardComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DrawBoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        nativeElement = fixture.debugElement.queryAll(By.css('svg'))[0]
          .nativeElement;
        svgDebElem = fixture.debugElement.queryAll(By.css('svg'))[0];
        fixture.detectChanges();
        ctm = (nativeElement as SVGGraphicsElement).getScreenCTM();
      });
  });
  /**
   *
   *
   *
   *
   */
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.board.tagName).toEqual('svg');
  });

  it('it should draw a correct svg board', () => {
    ({ width, height } = widthHeightExtractor(nativeElement));
    expect(width).toBe(600);
    component.height = 1000;
    fixture.detectChanges();
    ({ width, height } = widthHeightExtractor(nativeElement));
    expect(height).toBe(1000);
  });

  it('should launch the appropriate drag method', () => {
    const spyStart = spyOn(svgDebElem.componentInstance, 'startDrag'),
      spyDrag = spyOn(svgDebElem.componentInstance, 'drag'),
      spyEnd = spyOn(svgDebElem.componentInstance, 'endDrag');
    svgDebElem.triggerEventHandler('mousedown', {});
    fixture.detectChanges();
    expect(spyStart).toHaveBeenCalled();
    svgDebElem.triggerEventHandler('mousemove', {});
    fixture.detectChanges();
    expect(spyDrag).toHaveBeenCalled();
    svgDebElem.triggerEventHandler('mouseup', {});
    fixture.detectChanges();
    expect(spyEnd).toHaveBeenCalled();
  });

  xit('should track the stating point', () => {
    const { e: xAxysAdder, f: yAxysAdder } = ctm;
    svgDebElem.triggerEventHandler('mousedown', new Event('mousedown', {}));
    fixture.detectChanges();
    expect(component.startPointX + xAxysAdder).toBe(50);
  });

  xit('should track the end point', () => {});
});
