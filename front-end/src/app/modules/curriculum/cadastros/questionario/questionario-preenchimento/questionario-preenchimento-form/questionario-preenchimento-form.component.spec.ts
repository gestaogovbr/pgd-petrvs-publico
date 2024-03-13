import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioPreenchimentoFormComponent } from './questionario-preenchimento-form.component';

describe('QuestionarioPreenchimentoFormComponent', () => {
  let component: QuestionarioPreenchimentoFormComponent;
  let fixture: ComponentFixture<QuestionarioPreenchimentoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionarioPreenchimentoFormComponent]
    });
    fixture = TestBed.createComponent(QuestionarioPreenchimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
