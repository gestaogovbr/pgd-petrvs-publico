import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoObjetivoFormComponent } from './planejamento-objetivo-form.component';

describe('EixoTematicoFormComponent', () => {
  let component: PlanejamentoObjetivoFormComponent;
  let fixture: ComponentFixture<PlanejamentoObjetivoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanejamentoObjetivoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoObjetivoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
