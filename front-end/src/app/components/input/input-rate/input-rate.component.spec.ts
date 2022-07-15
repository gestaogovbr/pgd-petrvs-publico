import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRateComponent } from './input-rate.component';

describe('InputRateComponent', () => {
  let component: InputRateComponent;
  let fixture: ComponentFixture<InputRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
