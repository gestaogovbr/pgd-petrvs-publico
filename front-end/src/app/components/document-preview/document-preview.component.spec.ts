import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPreviewComponent } from './document-preview.component';

describe('DocumentPreviewComponent', () => {
  let component: DocumentPreviewComponent;
  let fixture: ComponentFixture<DocumentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
