import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoTarefaFilterComponent } from './projeto-tarefa-filter.component';

describe('ProjetoTarefaFilterComponent', () => {
  let component: ProjetoTarefaFilterComponent;
  let fixture: ComponentFixture<ProjetoTarefaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoTarefaFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoTarefaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
