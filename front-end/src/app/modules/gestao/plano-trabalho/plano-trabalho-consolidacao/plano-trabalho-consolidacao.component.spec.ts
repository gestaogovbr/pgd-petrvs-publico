import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTrabalhoConsolidacaoComponent } from './plano-trabalho-consolidacao.component';

describe('PlanoTrabalhoConsolidacaoComponent', () => {
  let component: PlanoTrabalhoConsolidacaoComponent;
  let fixture: ComponentFixture<PlanoTrabalhoConsolidacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTrabalhoConsolidacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTrabalhoConsolidacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
