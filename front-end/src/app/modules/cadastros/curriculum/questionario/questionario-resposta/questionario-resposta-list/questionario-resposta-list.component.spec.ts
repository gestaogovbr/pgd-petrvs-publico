import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioRespostaListComponent } from './questionario-resposta-list.component';

describe('QuestionarioRespostaListComponent', () => {
  let component: QuestionarioRespostaListComponent;
  let fixture: ComponentFixture<QuestionarioRespostaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionarioRespostaListComponent]
    });
    fixture = TestBed.createComponent(QuestionarioRespostaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
