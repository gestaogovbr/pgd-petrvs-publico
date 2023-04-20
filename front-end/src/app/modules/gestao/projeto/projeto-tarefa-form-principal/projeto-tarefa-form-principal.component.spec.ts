import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoTarefaFormPrincipalComponent } from './projeto-tarefa-form-principal.component';

describe('ProjetoTarefaFormPrincipalComponent', () => {
  let component: ProjetoTarefaFormPrincipalComponent;
  let fixture: ComponentFixture<ProjetoTarefaFormPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoTarefaFormPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoTarefaFormPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
