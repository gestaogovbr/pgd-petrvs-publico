import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrvsListenerComponent } from './petrvs-listener.component';

describe('PetrvsListenerComponent', () => {
  let component: PetrvsListenerComponent;
  let fixture: ComponentFixture<PetrvsListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetrvsListenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrvsListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
