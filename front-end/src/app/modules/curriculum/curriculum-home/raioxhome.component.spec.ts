import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaioxhomeComponent } from './raioxhome.component';

describe('RaioxhomeComponent', () => {
  let component: RaioxhomeComponent;
  let fixture: ComponentFixture<RaioxhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaioxhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaioxhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
