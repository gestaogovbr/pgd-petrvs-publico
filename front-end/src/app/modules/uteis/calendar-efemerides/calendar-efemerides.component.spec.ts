import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEfemeridesComponent } from './calendar-efemerides.component';

describe('CalendarEfemeridesComponent', () => {
  let component: CalendarEfemeridesComponent;
  let fixture: ComponentFixture<CalendarEfemeridesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEfemeridesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEfemeridesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
