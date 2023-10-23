import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioPerguntaFormComponent } from './questionario-pergunta-form.component';

describe('QuestionarioPerguntaFormComponent', () => {
  let component: QuestionarioPerguntaFormComponent;
  let fixture: ComponentFixture<QuestionarioPerguntaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionarioPerguntaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionarioPerguntaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
