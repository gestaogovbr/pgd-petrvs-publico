import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriadoFormComponent } from './feriado-form.component';

describe('FeriadoFormComponent', () => {
  let component: FeriadoFormComponent;
  let fixture: ComponentFixture<FeriadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeriadoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeriadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
