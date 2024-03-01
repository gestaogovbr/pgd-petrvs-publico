import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumAtributosBig5FormComponent } from './curriculum-atributos-big5-form.component';

describe('CurriculumAtributosBig5FormComponent', () => {
  let component: CurriculumAtributosBig5FormComponent;
  let fixture: ComponentFixture<CurriculumAtributosBig5FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumAtributosBig5FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumAtributosBig5FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
