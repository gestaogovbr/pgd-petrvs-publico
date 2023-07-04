import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioPerguntaListComponent } from './questionario-pergunta-list.component';

describe('QuestionarioPerguntaListComponent', () => {
  let component: QuestionarioPerguntaListComponent;
  let fixture: ComponentFixture<QuestionarioPerguntaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionarioPerguntaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionarioPerguntaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
