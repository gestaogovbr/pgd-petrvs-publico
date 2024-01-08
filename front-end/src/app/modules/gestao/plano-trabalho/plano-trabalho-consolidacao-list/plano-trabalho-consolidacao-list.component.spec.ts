import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTrabalhoConsolidacaoListComponent } from './plano-trabalho-consolidacao-list.component';

describe('PlanoTrabalhoConsolidacaoListComponent', () => {
  let component: PlanoTrabalhoConsolidacaoListComponent;
  let fixture: ComponentFixture<PlanoTrabalhoConsolidacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTrabalhoConsolidacaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTrabalhoConsolidacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
