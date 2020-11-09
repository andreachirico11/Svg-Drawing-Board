import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImgDownloaderService } from 'src/app/services/imgDownloaderService/img-downloader.service';

import { DrawBoardComponent } from './draw-board.component';

fdescribe('DrawBoardComponent', () => {
  let component: DrawBoardComponent,
    nativeElement: SVGElement,
    fixture: ComponentFixture<DrawBoardComponent>,
    widthHeightExtractor = new ImgDownloaderService().extractSvgDimension,
    width,
    height,
    rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
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
        fixture.detectChanges();
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

  xit('should track the position correctly', () => {
    const spy = spyOn(component, 'getMousePosition');
    nativeElement.dispatchEvent(new MouseEvent('mousedown'));
    expect(spy).toHaveBeenCalled();
  });

  xit('should track the stating point', () => {});

  xit('should track the end point', () => {});
});
