import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimlaneComponent } from './swimlane.component';

describe('SwimlaneComponent', () => {
  let component: SwimlaneComponent;
  let fixture: ComponentFixture<SwimlaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwimlaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
