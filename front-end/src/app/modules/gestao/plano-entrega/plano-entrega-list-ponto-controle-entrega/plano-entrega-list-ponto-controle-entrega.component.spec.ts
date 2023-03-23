import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoEntregaListPontoControleEntregaComponent } from './plano-entrega-list-ponto-controle-entrega.component';

describe('PlanoFormPontoControleComponent', () => {
  let component: PlanoEntregaListPontoControleEntregaComponent;
  let fixture: ComponentFixture<PlanoEntregaListPontoControleEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaListPontoControleEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaListPontoControleEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
