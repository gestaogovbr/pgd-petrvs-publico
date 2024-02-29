import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumAtributosdiscFormComponent } from './curriculum-atributosdisc-form.component';

describe('CurriculumAtributosdiscFormComponent', () => {
  let component: CurriculumAtributosdiscFormComponent;
  let fixture: ComponentFixture<CurriculumAtributosdiscFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumAtributosdiscFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumAtributosdiscFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
