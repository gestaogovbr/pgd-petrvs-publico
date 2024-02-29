import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacaoComponent } from './documentacao.component';

describe('DocumentacaoComponent', () => {
  let component: DocumentacaoComponent;
  let fixture: ComponentFixture<DocumentacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentacaoComponent]
    });
    fixture = TestBed.createComponent(DocumentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
