import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosBadgeComponent } from './documentos-badge.component';

describe('DocumentosBadgeComponent', () => {
  let component: DocumentosBadgeComponent;
  let fixture: ComponentFixture<DocumentosBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
