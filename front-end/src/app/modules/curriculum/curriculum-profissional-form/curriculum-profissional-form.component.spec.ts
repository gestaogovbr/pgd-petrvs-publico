import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumProfissionalFormComponent } from './curriculum-profissional-form.component';

describe('CurriculumProfissionalFormComponent', () => {
  let component: CurriculumProfissionalFormComponent;
  let fixture: ComponentFixture<CurriculumProfissionalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumProfissionalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumProfissionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
