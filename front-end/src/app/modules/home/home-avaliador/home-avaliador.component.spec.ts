import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAvaliadorComponent } from './home-avaliador.component';

describe('HomeAvaliadorComponent', () => {
  let component: HomeAvaliadorComponent;
  let fixture: ComponentFixture<HomeAvaliadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAvaliadorComponent]
    });
    fixture = TestBed.createComponent(HomeAvaliadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
