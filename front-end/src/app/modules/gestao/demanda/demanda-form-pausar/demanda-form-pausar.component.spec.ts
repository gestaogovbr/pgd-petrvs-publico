import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaFormPausarComponent } from './demanda-form-pausar.component';

describe('DemandaFormPausarComponent', () => {
  let component: DemandaFormPausarComponent;
  let fixture: ComponentFixture<DemandaFormPausarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaFormPausarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaFormPausarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
