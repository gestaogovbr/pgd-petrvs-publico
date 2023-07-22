import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeFormConcluirComponent } from './atividade-form-concluir.component';

describe('AtividadeFormConcluirComponent', () => {
  let component: AtividadeFormConcluirComponent;
  let fixture: ComponentFixture<AtividadeFormConcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeFormConcluirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeFormConcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
