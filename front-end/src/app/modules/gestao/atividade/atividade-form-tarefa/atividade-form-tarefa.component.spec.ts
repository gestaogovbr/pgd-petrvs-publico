import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeFormTarefaComponent } from './atividade-form-tarefa.component';

describe('AtividadeFormTarefaComponent', () => {
  let component: AtividadeFormTarefaComponent;
  let fixture: ComponentFixture<AtividadeFormTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeFormTarefaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeFormTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
