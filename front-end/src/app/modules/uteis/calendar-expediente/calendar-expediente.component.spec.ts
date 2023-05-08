import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarExpedienteComponent } from './calendar-expediente.component';

describe('CalendarExpedienteComponent', () => {
  let component: CalendarExpedienteComponent;
  let fixture: ComponentFixture<CalendarExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarExpedienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
