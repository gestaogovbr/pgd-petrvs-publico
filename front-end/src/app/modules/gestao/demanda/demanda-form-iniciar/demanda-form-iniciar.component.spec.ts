import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaFormIniciarComponent } from './demanda-form-iniciar.component';

describe('DemandaFormIniciarComponent', () => {
  let component: DemandaFormIniciarComponent;
  let fixture: ComponentFixture<DemandaFormIniciarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaFormIniciarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaFormIniciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
