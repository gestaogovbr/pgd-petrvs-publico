import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoEntregaPontoControleFormEntregaComponent } from './plano-entrega-ponto-controle-form-entrega.component';

describe('PlanejamentoFormComponent', () => {
  let component: PlanoEntregaPontoControleFormEntregaComponent;
  let fixture: ComponentFixture<PlanoEntregaPontoControleFormEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaPontoControleFormEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaPontoControleFormEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
