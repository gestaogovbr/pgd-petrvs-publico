import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaFormProrrogarComponent } from './demanda-form-prorrogar.component';

describe('DemandaFormProrrogarComponent', () => {
  let component: DemandaFormProrrogarComponent;
  let fixture: ComponentFixture<DemandaFormProrrogarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaFormProrrogarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaFormProrrogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
