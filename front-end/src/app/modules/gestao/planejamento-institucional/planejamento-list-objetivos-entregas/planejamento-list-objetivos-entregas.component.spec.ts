import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoListObjetivosEntregasComponent } from './planejamento-list-objetivos-entregas.component';

describe('PlanejamentoListObjetivosEntregasComponent', () => {
  let component: PlanejamentoListObjetivosEntregasComponent;
  let fixture: ComponentFixture<PlanejamentoListObjetivosEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanejamentoListObjetivosEntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoListObjetivosEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
