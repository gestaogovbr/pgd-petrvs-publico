import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRaioxComponent } from './home-raiox.component';

describe('HomeRaioxComponent', () => {
  let component: HomeRaioxComponent;
  let fixture: ComponentFixture<HomeRaioxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeRaioxComponent]
    });
    fixture = TestBed.createComponent(HomeRaioxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
