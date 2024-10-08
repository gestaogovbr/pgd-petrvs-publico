import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFormComponent } from './status-form.component';

describe('DocumentosAssinarComponent', () => {
  let component: StatusFormComponent;
  let fixture: ComponentFixture<StatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
