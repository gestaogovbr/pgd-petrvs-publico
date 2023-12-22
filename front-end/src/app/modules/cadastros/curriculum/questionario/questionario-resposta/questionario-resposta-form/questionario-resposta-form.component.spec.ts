import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioRespostaFormComponent } from './questionario-resposta-form.component';

describe('QuestionarioRespostaFormComponent', () => {
  let component: QuestionarioRespostaFormComponent;
  let fixture: ComponentFixture<QuestionarioRespostaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionarioRespostaFormComponent]
    });
    fixture = TestBed.createComponent(QuestionarioRespostaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
