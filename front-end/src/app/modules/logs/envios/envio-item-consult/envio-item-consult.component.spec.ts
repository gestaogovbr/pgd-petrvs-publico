import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioItemConsultComponent } from './envio-item-consult.component';

describe('EnvioConsultComponent', () => {
  let component: EnvioItemConsultComponent;
  let fixture: ComponentFixture<EnvioItemConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioItemConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioItemConsultComponent);
    component = fixture.componentInstance;
    //fixture.detectErrors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
