import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoMapaComponent } from './planejamento-mapa.component';

describe('PlanejamentoMapaComponent', () => {
  let component: PlanejamentoMapaComponent;
  let fixture: ComponentFixture<PlanejamentoMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanejamentoMapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
