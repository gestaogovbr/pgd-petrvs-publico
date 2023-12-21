import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosLinkComponent } from './documentos-link.component';

describe('DocumentosLinkComponent', () => {
  let component: DocumentosLinkComponent;
  let fixture: ComponentFixture<DocumentosLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
