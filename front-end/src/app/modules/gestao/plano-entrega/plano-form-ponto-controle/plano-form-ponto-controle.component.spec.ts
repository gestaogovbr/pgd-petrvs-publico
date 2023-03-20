import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoFormPontoControleComponent } from './plano-form-ponto-controle.component';

describe('PlanoFormPontoControleComponent', () => {
  let component: PlanoFormPontoControleComponent;
  let fixture: ComponentFixture<PlanoFormPontoControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoFormPontoControleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoFormPontoControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
