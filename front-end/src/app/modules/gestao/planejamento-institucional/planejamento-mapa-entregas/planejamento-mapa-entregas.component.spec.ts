import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoMapaEntregasComponent } from './planejamento-mapa-entregas.component';

describe('PlanejamentoMapaEntregasComponent', () => {
  let component: PlanejamentoMapaEntregasComponent;
  let fixture: ComponentFixture<PlanejamentoMapaEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanejamentoMapaEntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoMapaEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
