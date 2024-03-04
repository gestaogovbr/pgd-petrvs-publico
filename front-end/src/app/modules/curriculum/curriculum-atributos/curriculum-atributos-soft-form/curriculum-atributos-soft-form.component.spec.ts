import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumAtributosSoftFormComponent } from './curriculum-atributos-soft-form.component';

describe('CurriculumAtributosSoftFormComponent', () => {
  let component: CurriculumAtributosSoftFormComponent;
  let fixture: ComponentFixture<CurriculumAtributosSoftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumAtributosSoftFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumAtributosSoftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
