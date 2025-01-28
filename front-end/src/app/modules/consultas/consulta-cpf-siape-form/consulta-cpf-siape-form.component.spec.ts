import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCpfSiapeFormComponent } from './consulta-cpf-siape-form.component';

describe('ConsultaCpfSiapeFormComponent', () => {
  let component: ConsultaCpfSiapeFormComponent;
  let fixture: ComponentFixture<ConsultaCpfSiapeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaCpfSiapeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCpfSiapeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
