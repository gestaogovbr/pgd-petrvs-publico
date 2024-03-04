import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumAtributosDassFormComponent } from './curriculum-atributos-dass-form.component';

describe('CurriculumAtributosDassFormComponent', () => {
  let component: CurriculumAtributosDassFormComponent;
  let fixture: ComponentFixture<CurriculumAtributosDassFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurriculumAtributosDassFormComponent]
    });
    fixture = TestBed.createComponent(CurriculumAtributosDassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
