import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSuporteComponent } from './home-suporte.component';

describe('HomeSuporteComponent', () => {
  let component: HomeSuporteComponent;
  let fixture: ComponentFixture<HomeSuporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSuporteComponent]
    });
    fixture = TestBed.createComponent(HomeSuporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
