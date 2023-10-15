import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';
import { PlanoTrabalhoConsolidacaoAvaliacaoComponent } from './plano-trabalho-consolidacao-avaliacao.component';

describe('PlanoTrabalhoConsolidacaoAvaliacaoComponent', () => {
  let component: PlanoTrabalhoConsolidacaoAvaliacaoComponent;
  let fixture: ComponentFixture<PlanoTrabalhoConsolidacaoAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTrabalhoConsolidacaoAvaliacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTrabalhoConsolidacaoAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
