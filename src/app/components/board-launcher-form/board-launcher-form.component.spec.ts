import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLauncherFormComponent } from './board-launcher-form.component';

describe('BoardLauncherFormComponent', () => {
  let component: BoardLauncherFormComponent;
  let fixture: ComponentFixture<BoardLauncherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardLauncherFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardLauncherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
