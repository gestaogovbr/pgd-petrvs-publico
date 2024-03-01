import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumAtributosDiscFormComponent } from './curriculum-atributos-disc-form.component';

describe('CurriculumAtributosDiscFormComponent', () => {
  let component: CurriculumAtributosDiscFormComponent;
  let fixture: ComponentFixture<CurriculumAtributosDiscFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumAtributosDiscFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumAtributosDiscFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
