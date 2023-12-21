import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeHierarquiaComponent } from './atividade-hierarquia.component';

describe('AtividadeHierarquiaComponent', () => {
  let component: AtividadeHierarquiaComponent;
  let fixture: ComponentFixture<AtividadeHierarquiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtividadeHierarquiaComponent]
    });
    fixture = TestBed.createComponent(AtividadeHierarquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
