import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoEntregaListPontoControleComponent } from './plano-entrega-list-ponto-controle.component';

describe('PlanoFormPontoControleComponent', () => {
  let component: PlanoEntregaListPontoControleComponent;
  let fixture: ComponentFixture<PlanoEntregaListPontoControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaListPontoControleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaListPontoControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
