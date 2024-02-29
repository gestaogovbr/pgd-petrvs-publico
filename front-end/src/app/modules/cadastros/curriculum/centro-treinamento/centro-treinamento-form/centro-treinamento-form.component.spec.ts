import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroTreinamentoFormComponent } from './centro-treinamento-form.component';

describe('CentroTreinamentoFormComponent', () => {
  let component: CentroTreinamentoFormComponent;
  let fixture: ComponentFixture<CentroTreinamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroTreinamentoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroTreinamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
