import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaFormUsuarioComponent } from './preferencia-form-usuario.component';

describe('PreferenciaFormUsuarioComponent', () => {
  let component: PreferenciaFormUsuarioComponent;
  let fixture: ComponentFixture<PreferenciaFormUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenciaFormUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenciaFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
