import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaEntregasPlanoTrabalhoComponent } from './plano-entrega-entregas-plano-trabalho.component';

describe('PlanoEntregaEntregasPlanoTrabalhoComponent', () => {
  let component: PlanoEntregaEntregasPlanoTrabalhoComponent;
  let fixture: ComponentFixture<PlanoEntregaEntregasPlanoTrabalhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoEntregaEntregasPlanoTrabalhoComponent]
    });
    fixture = TestBed.createComponent(PlanoEntregaEntregasPlanoTrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
