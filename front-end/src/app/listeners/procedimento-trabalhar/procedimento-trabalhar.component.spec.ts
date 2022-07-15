import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimentoTrabalharComponent } from './procedimento-trabalhar.component';

describe('ProcedimentoTrabalharComponent', () => {
  let component: ProcedimentoTrabalharComponent;
  let fixture: ComponentFixture<ProcedimentoTrabalharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimentoTrabalharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimentoTrabalharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
