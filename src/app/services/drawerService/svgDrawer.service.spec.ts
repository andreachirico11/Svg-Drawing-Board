import { waitForAsync, TestBed } from '@angular/core/testing';
import { drawerService } from './shapeDrawer.service';

xdescribe('drawerService', () => {
  let dService: drawerService;
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
        providers: [drawerService],
      })
        .compileComponents()
        .then(() => {
          dService = TestBed.inject(drawerService);
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
  xit('can detect real mouse position', () => {});
  xit('can create a line', () => {});

  xit('can update a line', () => {});

  xit('can generate an id', () => {});

  xit('', () => {});

  xit('', () => {});

  xit('', () => {});

  //   xit('inject correctly svg base element', () => {});
  //   xit('add svg background', () => {});
  //   xit('detect mouse events', () => {});
  //   xit('correctly draw new svg element', () => {});
  //   xit('correctly updates existing svg', () => {});
  //   xit('correctly completes draw', () => {});
});
