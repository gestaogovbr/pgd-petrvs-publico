import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorListComponent } from './error-list.component';

describe('ErrorListComponent', () => {
  let component: ErrorListComponent;
  let fixture: ComponentFixture<ErrorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorListComponent);
    component = fixture.componentInstance;
    fixture.detectErrors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
