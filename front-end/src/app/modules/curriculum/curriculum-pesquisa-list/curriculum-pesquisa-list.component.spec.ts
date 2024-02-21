import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumPesquisaListComponent } from './curriculum-pesquisa-list.component';

describe('CurriculumPesquisaListComponent', () => {
  let component: CurriculumPesquisaListComponent;
  let fixture: ComponentFixture<CurriculumPesquisaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurriculumPesquisaListComponent]
    });
    fixture = TestBed.createComponent(CurriculumPesquisaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
