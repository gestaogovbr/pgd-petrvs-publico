import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioItemEntregaListComponent } from './envio-item-entrega-list.component';

describe('EnvioItemEntregaListComponent', () => {
  let component: EnvioItemEntregaListComponent;
  let fixture: ComponentFixture<EnvioItemEntregaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioItemEntregaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioItemEntregaListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
