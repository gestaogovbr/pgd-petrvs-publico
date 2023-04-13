import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaParticipantesComponent } from './programa-participantes.component';

describe('ProgramaParticipantesComponent', () => {
  let component: ProgramaParticipantesComponent;
  let fixture: ComponentFixture<ProgramaParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaParticipantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
