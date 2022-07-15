import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAlertComponent } from './top-alert.component';

describe('TopAlertComponent', () => {
  let component: TopAlertComponent;
  let fixture: ComponentFixture<TopAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
