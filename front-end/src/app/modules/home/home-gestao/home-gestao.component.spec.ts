import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGestaoComponent } from './home-gestao.component';

describe('HomeGestaoComponent', () => {
  let component: HomeGestaoComponent;
  let fixture: ComponentFixture<HomeGestaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeGestaoComponent]
    });
    fixture = TestBed.createComponent(HomeGestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
