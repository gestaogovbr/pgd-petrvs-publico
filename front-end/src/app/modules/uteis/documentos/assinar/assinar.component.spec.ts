import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinarComponent } from './assinar.component';

describe('AssinarComponent', () => {
  let component: AssinarComponent;
  let fixture: ComponentFixture<AssinarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
