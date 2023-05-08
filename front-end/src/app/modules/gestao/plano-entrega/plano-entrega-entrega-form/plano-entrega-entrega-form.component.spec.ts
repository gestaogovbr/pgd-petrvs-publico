import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaEntregaFormComponent } from './plano-entrega-entrega-form.component';

describe('PlanoEntregaEntregaFormComponent', () => {
  let component: PlanoEntregaEntregaFormComponent;
  let fixture: ComponentFixture<PlanoEntregaEntregaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaEntregaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaEntregaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
