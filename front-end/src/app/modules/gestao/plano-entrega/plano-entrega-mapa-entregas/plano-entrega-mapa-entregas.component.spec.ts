import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaMapaEntregasComponent } from './plano-entrega-mapa-entregas.component';

describe('PlanoEntregaMapaEntregasComponent', () => {
  let component: PlanoEntregaMapaEntregasComponent;
  let fixture: ComponentFixture<PlanoEntregaMapaEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaMapaEntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaMapaEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
