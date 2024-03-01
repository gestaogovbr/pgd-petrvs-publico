import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumAtributosComponent } from './curriculum-atributos.component';

describe('CurriculumAtributosComponent', () => {
  let component: CurriculumAtributosComponent;
  let fixture: ComponentFixture<CurriculumAtributosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurriculumAtributosComponent]
    });
    fixture = TestBed.createComponent(CurriculumAtributosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
