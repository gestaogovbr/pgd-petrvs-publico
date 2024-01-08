import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaFormComponent } from './ocorrencia-form.component';

describe('OcorrenciaFormComponent', () => {
  let component: OcorrenciaFormComponent;
  let fixture: ComponentFixture<OcorrenciaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcorrenciaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
