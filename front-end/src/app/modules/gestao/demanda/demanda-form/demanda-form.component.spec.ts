import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaFormComponent } from './demanda-form.component';

describe('DemandaFormComponent', () => {
  let component: DemandaFormComponent;
  let fixture: ComponentFixture<DemandaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
