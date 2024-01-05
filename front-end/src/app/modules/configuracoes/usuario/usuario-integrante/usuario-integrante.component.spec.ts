import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioIntegranteComponent } from './usuario-integrante.component';

describe('UsuarioIntegranteComponent', () => {
  let component: UsuarioIntegranteComponent;
  let fixture: ComponentFixture<UsuarioIntegranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioIntegranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioIntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
