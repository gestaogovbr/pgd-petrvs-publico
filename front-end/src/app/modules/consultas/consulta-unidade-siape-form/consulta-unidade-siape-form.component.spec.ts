import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUnidadeSiapeFormComponent } from './consulta-unidade-siape-form.component';

describe('ConsultaUnidadeSiapeFormComponent', () => {
  let component: ConsultaUnidadeSiapeFormComponent;
  let fixture: ComponentFixture<ConsultaUnidadeSiapeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaUnidadeSiapeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaUnidadeSiapeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
