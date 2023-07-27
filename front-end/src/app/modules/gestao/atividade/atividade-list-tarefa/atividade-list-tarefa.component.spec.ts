import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeListEntregaComponent } from './atividade-list-tarefa.component';

describe('AtividadeListEntregaComponent', () => {
  let component: AtividadeListEntregaComponent;
  let fixture: ComponentFixture<AtividadeListEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeListEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeListEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
