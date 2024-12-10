import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioConsultComponent } from './envio-consult.component';

describe('EnvioConsultComponent', () => {
  let component: EnvioConsultComponent;
  let fixture: ComponentFixture<EnvioConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioConsultComponent);
    component = fixture.componentInstance;
    //fixture.detectErrors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
