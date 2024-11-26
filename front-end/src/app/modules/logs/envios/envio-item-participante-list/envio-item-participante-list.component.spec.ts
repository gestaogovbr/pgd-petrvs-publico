import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioItemParticipanteListComponent } from './envio-item-participante-list.component';

describe('ErrorListComponent', () => {
  let component: EnvioItemParticipanteListComponent;
  let fixture: ComponentFixture<EnvioItemParticipanteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioItemParticipanteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioItemParticipanteListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
