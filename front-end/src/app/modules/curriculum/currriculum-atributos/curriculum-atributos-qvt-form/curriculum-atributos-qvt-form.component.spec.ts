/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CurriculumAtributosQvtFormComponent } from './curriculum-atributos-qvt-form.component';

describe('CurriculumAtributosQvdFormComponent', () => {
  let component: CurriculumAtributosQvtFormComponent;
  let fixture: ComponentFixture<CurriculumAtributosQvtFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumAtributosQvtFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumAtributosQvtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
