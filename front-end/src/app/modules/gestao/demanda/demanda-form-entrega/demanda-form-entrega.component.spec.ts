import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaFormEntregaComponent } from './demanda-form-entrega.component';

describe('DemandaFormEntregaComponent', () => {
  let component: DemandaFormEntregaComponent;
  let fixture: ComponentFixture<DemandaFormEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaFormEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaFormEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
