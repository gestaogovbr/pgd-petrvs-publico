import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCpfSiapeResultComponent } from './consulta-cpf-siape-result.component';

describe('ConsultaCpfSiapeResultComponent', () => {
  let component: ConsultaCpfSiapeResultComponent;
  let fixture: ComponentFixture<ConsultaCpfSiapeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaCpfSiapeResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCpfSiapeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
