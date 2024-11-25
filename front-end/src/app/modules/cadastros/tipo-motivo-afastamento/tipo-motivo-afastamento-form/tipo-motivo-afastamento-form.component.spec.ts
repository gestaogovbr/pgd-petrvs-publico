import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMotivoAfastamentoFormComponent } from './tipo-motivo-afastamento-form.component';

describe('TipoMotivoAfastamentoFormComponent', () => {
  let component: TipoMotivoAfastamentoFormComponent;
  let fixture: ComponentFixture<TipoMotivoAfastamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMotivoAfastamentoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMotivoAfastamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
