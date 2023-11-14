import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioListPerguntaComponent } from './questionario-list-pergunta.component';

describe('QuestionarioListPerguntaComponent', () => {
  let component: QuestionarioListPerguntaComponent;
  let fixture: ComponentFixture<QuestionarioListPerguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionarioListPerguntaComponent]
    });
    fixture = TestBed.createComponent(QuestionarioListPerguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
