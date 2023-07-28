import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTarefaFormComponent } from './tipo-tarefa-form.component';

describe('TipoTarefaFormComponent', () => {
  let component: TipoTarefaFormComponent;
  let fixture: ComponentFixture<TipoTarefaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTarefaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTarefaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
