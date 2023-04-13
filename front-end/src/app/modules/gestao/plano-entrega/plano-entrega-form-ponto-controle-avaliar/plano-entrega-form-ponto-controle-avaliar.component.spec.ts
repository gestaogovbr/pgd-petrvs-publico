import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaFormPontoControleAvaliarComponent } from './plano-entrega-form-ponto-controle-avaliar.component';

describe('DemandaFormAvaliarComponent', () => {
  let component: PlanoEntregaFormPontoControleAvaliarComponent;
  let fixture: ComponentFixture<PlanoEntregaFormPontoControleAvaliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaFormPontoControleAvaliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaFormPontoControleAvaliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
