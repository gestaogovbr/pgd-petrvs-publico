import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaFormPetrvsComponent } from './preferencia-form-petrvs.component';

describe('PreferenciaFormPetrvsComponent', () => {
  let component: PreferenciaFormPetrvsComponent;
  let fixture: ComponentFixture<PreferenciaFormPetrvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenciaFormPetrvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenciaFormPetrvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
