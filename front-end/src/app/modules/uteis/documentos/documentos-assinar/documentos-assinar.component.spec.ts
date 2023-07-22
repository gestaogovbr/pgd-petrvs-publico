import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosAssinarComponent } from './documentos-assinar.component';

describe('DocumentosAssinarComponent', () => {
  let component: DocumentosAssinarComponent;
  let fixture: ComponentFixture<DocumentosAssinarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosAssinarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosAssinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
