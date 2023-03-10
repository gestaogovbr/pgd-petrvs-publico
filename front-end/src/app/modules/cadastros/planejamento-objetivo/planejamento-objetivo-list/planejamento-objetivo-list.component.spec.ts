import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoObjetivoListComponent } from './planejamento-objetivo-list.component';

describe('EixoTematicoListComponent', () => {
  let component: PlanejamentoObjetivoListComponent;
  let fixture: ComponentFixture<PlanejamentoObjetivoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanejamentoObjetivoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoObjetivoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
