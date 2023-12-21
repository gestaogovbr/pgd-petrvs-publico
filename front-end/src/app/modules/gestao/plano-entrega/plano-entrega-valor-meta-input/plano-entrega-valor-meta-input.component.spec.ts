import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaValorMetaInputComponent } from './plano-entrega-valor-meta-input.component';

describe('PlanoEntregaValorMetaInputComponent', () => {
  let component: PlanoEntregaValorMetaInputComponent;
  let fixture: ComponentFixture<PlanoEntregaValorMetaInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoEntregaValorMetaInputComponent]
    });
    fixture = TestBed.createComponent(PlanoEntregaValorMetaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
