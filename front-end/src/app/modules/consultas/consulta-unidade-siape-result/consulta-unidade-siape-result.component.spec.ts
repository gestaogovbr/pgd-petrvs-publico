import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUnidadeSiapeResultComponent } from './consulta-unidade-siape-result.component';

describe('ConsultaUnidadeSiapeResultComponent', () => {
  let component: ConsultaUnidadeSiapeResultComponent;
  let fixture: ComponentFixture<ConsultaUnidadeSiapeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaUnidadeSiapeResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaUnidadeSiapeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
