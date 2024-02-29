import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaFormUnidadeComponent } from './preferencia-form-unidade.component';

describe('PreferenciaFormUnidadeComponent', () => {
  let component: PreferenciaFormUnidadeComponent;
  let fixture: ComponentFixture<PreferenciaFormUnidadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenciaFormUnidadeComponent]
    });
    fixture = TestBed.createComponent(PreferenciaFormUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
