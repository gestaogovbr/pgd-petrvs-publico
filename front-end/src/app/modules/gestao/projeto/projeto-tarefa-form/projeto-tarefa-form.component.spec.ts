import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoTarefaFormComponent } from './projeto-tarefa-form.component';

describe('ProjetoTarefaFormComponent', () => {
  let component: ProjetoTarefaFormComponent;
  let fixture: ComponentFixture<ProjetoTarefaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoTarefaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoTarefaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
