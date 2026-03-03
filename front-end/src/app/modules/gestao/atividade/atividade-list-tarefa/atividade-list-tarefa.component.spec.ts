import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtividadeListTarefaComponent } from './atividade-list-tarefa.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AtividadeListTarefaComponent', () => {
  let component: AtividadeListTarefaComponent;
  let fixture: ComponentFixture<AtividadeListTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ AtividadeListTarefaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeListTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
