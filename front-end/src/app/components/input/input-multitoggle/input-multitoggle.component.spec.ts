import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMultitoggleComponent } from './input-multitoggle.component';

describe('InputMultitoggleComponent', () => {
  let component: InputMultitoggleComponent;
  let fixture: ComponentFixture<InputMultitoggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMultitoggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMultitoggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
