import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioPreenchimentoListComponent } from './questionario-preenchimento-list.component';

describe('QuestionarioRespostaListComponent', () => {
  let component: QuestionarioPreenchimentoListComponent;
  let fixture: ComponentFixture<QuestionarioPreenchimentoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionarioPreenchimentoListComponent]
    });
    fixture = TestBed.createComponent(QuestionarioPreenchimentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
