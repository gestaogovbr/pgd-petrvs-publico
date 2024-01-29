import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrriculumAtributosComponent } from './currriculum-atributos.component';

describe('CurrriculumAtributosComponent', () => {
  let component: CurrriculumAtributosComponent;
  let fixture: ComponentFixture<CurrriculumAtributosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrriculumAtributosComponent]
    });
    fixture = TestBed.createComponent(CurrriculumAtributosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
