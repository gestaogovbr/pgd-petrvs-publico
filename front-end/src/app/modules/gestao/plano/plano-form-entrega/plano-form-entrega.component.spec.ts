import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoFormEntregaComponent } from './plano-form-entrega.component';

describe('EixoTematicoFormComponent', () => {
  let component: PlanoFormEntregaComponent;
  let fixture: ComponentFixture<PlanoFormEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoFormEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoFormEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
