import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTarefaListComponent } from './tipo-tarefa-list.component';

describe('TipoTarefaListComponent', () => {
  let component: TipoTarefaListComponent;
  let fixture: ComponentFixture<TipoTarefaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTarefaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTarefaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
