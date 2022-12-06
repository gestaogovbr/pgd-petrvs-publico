import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimerComponent } from './input-timer.component';

describe('InputTimerComponent', () => {
  let component: InputTimerComponent;
  let fixture: ComponentFixture<InputTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
