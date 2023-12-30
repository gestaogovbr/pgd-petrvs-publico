import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumFormComponent } from './curriculum-form.component';

describe('RaioxPessoalFormComponent', () => {
  let component: CurriculumFormComponent;
  let fixture: ComponentFixture<CurriculumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
