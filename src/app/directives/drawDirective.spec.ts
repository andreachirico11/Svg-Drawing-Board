// import { Component } from '@angular/core';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { Svg } from '@svgdotjs/svg.js';
// import { CommonsModule } from '../commons.module';
// import { drawerService } from '../services/drawerService/shapeDrawer.service';
// import { DrawDirective } from './drawDirective';

// @Component({
//   selector: 'test',
//   template: `
//     <svg
//       drawDirective
//       xmlns="http://www.w3.org/2000/svg"
//       [attr.width]="width"
//       [attr.height]="height"
//     ></svg>
//   `,
// })
// class TestHostComponent {
//   public width = 500;
//   public height = 500;
// }

// class FakeDrawerService {}

// xdescribe('drawDirective', () => {
//   let hostFixture: ComponentFixture<TestHostComponent>;
//   let svgElement: Svg;
//   /**
//    *
//    *
//    *
//    *
//    *
//    */

//   beforeEach(
//     waitForAsync(() => {
//       TestBed.configureTestingModule({
//         declarations: [TestHostComponent, DrawDirective],
//         providers: [
//           CommonsModule,
//           { provide: drawerService, useClass: FakeDrawerService },
//         ],
//       })
//         .compileComponents()
//         .then(() => {
//           hostFixture = TestBed.createComponent(TestHostComponent);
//           svgElement = hostFixture.debugElement.query(By.css('svg'))
//             .nativeElement;
//         });
//     })
//   );
//   /**
//    *
//    *
//    *
//    *
//    *
//    */

//   xit('inject correctly svg base element', () => {});
//   xit('add svg background', () => {});
//   xit('detect mouse events', () => {});
//   xit('correctly draw new svg element', () => {});
//   xit('correctly updates existing svg', () => {});
//   xit('correctly completes draw', () => {});
// });
