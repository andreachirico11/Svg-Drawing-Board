import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSvgComponent } from './cat-svg.component';

xdescribe('CatSvgComponent', () => {
  let component: CatSvgComponent;
  let fixture: ComponentFixture<CatSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatSvgComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
