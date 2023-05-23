import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaFormEntregaComponent } from './plano-entrega-form-entrega.component';

describe('PlanoEntregaFormEntregaComponent', () => {
  let component: PlanoEntregaFormEntregaComponent;
  let fixture: ComponentFixture<PlanoEntregaFormEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaFormEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaFormEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
