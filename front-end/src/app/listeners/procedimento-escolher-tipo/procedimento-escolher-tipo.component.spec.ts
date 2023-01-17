import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimentoEscolherTipoComponent } from './procedimento-escolher-tipo.component';

describe('ProcedimentoEscolherTipoComponent', () => {
  let component: ProcedimentoEscolherTipoComponent;
  let fixture: ComponentFixture<ProcedimentoEscolherTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimentoEscolherTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimentoEscolherTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
