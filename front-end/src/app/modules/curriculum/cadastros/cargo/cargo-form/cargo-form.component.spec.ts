import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoFormComponent } from './cargo-form.component';

describe('CargoFormComponent', () => {
  let component: CargoFormComponent;
  let fixture: ComponentFixture<CargoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
