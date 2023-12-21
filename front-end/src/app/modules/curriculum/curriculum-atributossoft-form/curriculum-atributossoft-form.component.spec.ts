import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumAtributossoftFormComponent } from './curriculum-atributossoft-form.component';

describe('CurriculumAtributossoftFormComponent', () => {
  let component: CurriculumAtributossoftFormComponent;
  let fixture: ComponentFixture<CurriculumAtributossoftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumAtributossoftFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumAtributossoftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
