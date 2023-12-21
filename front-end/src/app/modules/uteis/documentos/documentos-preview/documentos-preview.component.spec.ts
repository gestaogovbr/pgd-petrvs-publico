import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosPreviewComponent } from './documentos-preview.component';

describe('DocumentosPreviewComponent', () => {
  let component: DocumentosPreviewComponent;
  let fixture: ComponentFixture<DocumentosPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
