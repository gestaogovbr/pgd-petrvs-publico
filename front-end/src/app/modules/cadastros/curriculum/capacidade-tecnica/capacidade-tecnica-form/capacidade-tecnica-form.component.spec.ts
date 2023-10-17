import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadeTecnicaFormComponent } from './capacidade-tecnica-form.component';

describe('CapacidadeTecnicaFormComponent', () => {
  let component: CapacidadeTecnicaFormComponent;
  let fixture: ComponentFixture<CapacidadeTecnicaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacidadeTecnicaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadeTecnicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
