import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLevelComponent } from './input-level.component';

describe('InputLevelComponent', () => {
  let component: InputLevelComponent;
  let fixture: ComponentFixture<InputLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
