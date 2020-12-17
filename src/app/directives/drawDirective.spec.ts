import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Circle, Svg } from '@svgdotjs/svg.js';
import { MyCommsModule } from '../mycomms.module';
import { BoardStateService } from '../services/boardStateService/boardStateService';
import { DrawDirective } from './drawDirective';

@Component({
  selector: 'test',
  template: `
    <svg
      drawDirective
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="width"
      [attr.height]="height"
    ></svg>
  `,
})
class TestHostComponent {
  public width = 500;
  public height = 500;
}

describe('drawDirective', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let svgElement: Svg;
  let boardSService: BoardStateService;
  let addSpy: jasmine.Spy;
  let updateSpy: jasmine.Spy;
  let testId = 'abcdefg';
  let testCircle = new Circle().width(50).height(50).id(testId);
  const getCircles = () => hostFixture.debugElement.queryAll(By.css('circle'));
  /**
   *
   *
   *
   *
   *
   */

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, DrawDirective],
        providers: [MyCommsModule, BoardStateService],
      })
        .compileComponents()
        .then(() => {
          hostFixture = TestBed.createComponent(TestHostComponent);
          svgElement = hostFixture.debugElement.query(By.css('svg'))
            .nativeElement;
          hostFixture.detectChanges();
          boardSService = TestBed.inject(BoardStateService);
          addSpy = spyOn(boardSService, 'addShape');
          updateSpy = spyOn(boardSService, 'updateShape');
          spyOn(boardSService, 'getShapeUnderEditID').and.returnValue(testId);
        });
    })
  );
  /**
   *
   *
   *
   *
   *
   */

  it('add svg background', () => {
    expect(
      hostFixture.debugElement.query(By.css('rect')).nativeElement
    ).toBeTruthy();
  });
  it('detect mouse events', () => {
    svgElement.dispatchEvent(new MouseEvent('mousedown'));
    expect(addSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledTimes(0);
    svgElement.dispatchEvent(new MouseEvent('mousemove'));
    expect(updateSpy).toHaveBeenCalled();
    const stopSpy = spyOn(boardSService, 'stopEditing');
    svgElement.dispatchEvent(new MouseEvent('mouseup'));
    expect(stopSpy).toHaveBeenCalled();
  });
  it('correctly draw new svg element', () => {
    addSpy.and.returnValue(testCircle);
    svgElement.dispatchEvent(new MouseEvent('mousedown'));
    expect(getCircles()[0].nativeElement).toBeTruthy();
  });
  it('correctly updates existing svg', () => {
    addSpy.and.returnValue(testCircle);
    updateSpy.and.returnValue(testCircle.fill('red'));
    svgElement.dispatchEvent(new MouseEvent('mousedown'));
    svgElement.dispatchEvent(new MouseEvent('mousemove'));
    hostFixture.detectChanges();
    expect(getCircles().length).toBe(1);
    expect(getCircles()[0].nativeElement.getAttribute('fill')).toBe('red');
  });
});
