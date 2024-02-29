import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePontoComponent } from './home-ponto.component';

describe('HomePontoComponent', () => {
  let component: HomePontoComponent;
  let fixture: ComponentFixture<HomePontoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePontoComponent]
    });
    fixture = TestBed.createComponent(HomePontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
