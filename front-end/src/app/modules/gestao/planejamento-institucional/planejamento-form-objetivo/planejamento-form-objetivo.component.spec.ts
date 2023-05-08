import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoFormObjetivoComponent } from './planejamento-form-objetivo.component';

describe('EixoTematicoFormComponent', () => {
  let component: PlanejamentoFormObjetivoComponent;
  let fixture: ComponentFixture<PlanejamentoFormObjetivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanejamentoFormObjetivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoFormObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
