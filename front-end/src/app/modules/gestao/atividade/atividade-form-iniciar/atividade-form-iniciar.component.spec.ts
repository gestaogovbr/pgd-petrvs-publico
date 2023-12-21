import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeFormIniciarComponent } from './atividade-form-iniciar.component';

describe('AtividadeFormIniciarComponent', () => {
  let component: AtividadeFormIniciarComponent;
  let fixture: ComponentFixture<AtividadeFormIniciarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeFormIniciarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeFormIniciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
