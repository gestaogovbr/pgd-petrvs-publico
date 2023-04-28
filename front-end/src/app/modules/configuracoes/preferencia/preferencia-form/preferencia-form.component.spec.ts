import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaFormComponent } from './preferencia-form.component';

describe('PreferenciaFormComponent', () => {
  let component: PreferenciaFormComponent;
  let fixture: ComponentFixture<PreferenciaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenciaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
