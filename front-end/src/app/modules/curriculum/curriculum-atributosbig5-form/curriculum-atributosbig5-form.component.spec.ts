import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumAtributosbig5FormComponent } from './curriculum-atributosbig5-form.component';

describe('CurriculumAtributosbig5FormComponent', () => {
  let component: CurriculumAtributosbig5FormComponent;
  let fixture: ComponentFixture<CurriculumAtributosbig5FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumAtributosbig5FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumAtributosbig5FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
