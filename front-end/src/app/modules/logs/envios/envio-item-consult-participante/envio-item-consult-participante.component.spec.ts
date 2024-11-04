import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioItemConsultParticipanteComponent } from './envio-item-consult-participante.component';

describe('EnvioConsultComponent', () => {
  let component: EnvioItemConsultParticipanteComponent;
  let fixture: ComponentFixture<EnvioItemConsultParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioItemConsultParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioItemConsultParticipanteComponent);
    component = fixture.componentInstance;
    //fixture.detectErrors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
