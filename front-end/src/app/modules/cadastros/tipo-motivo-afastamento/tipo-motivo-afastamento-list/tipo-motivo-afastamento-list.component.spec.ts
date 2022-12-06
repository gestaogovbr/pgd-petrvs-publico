import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMotivoAfastamentoListComponent } from './tipo-motivo-afastamento-list.component';

describe('TipoMotivoAfastamentoListComponent', () => {
  let component: TipoMotivoAfastamentoListComponent;
  let fixture: ComponentFixture<TipoMotivoAfastamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMotivoAfastamentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMotivoAfastamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
