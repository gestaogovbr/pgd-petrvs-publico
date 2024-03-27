/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CurriculumPesquisaListUsuarioComponent } from './curriculum-pesquisa-list-usuario.component';

describe('CurriculumPesquisaListUsuarioComponent', () => {
  let component: CurriculumPesquisaListUsuarioComponent;
  let fixture: ComponentFixture<CurriculumPesquisaListUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumPesquisaListUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumPesquisaListUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
