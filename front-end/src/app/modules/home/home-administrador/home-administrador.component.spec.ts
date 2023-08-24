import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdministradorComponent } from './home-administrador.component';

describe('HomeAdministradorComponent', () => {
  let component: HomeAdministradorComponent;
  let fixture: ComponentFixture<HomeAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdministradorComponent]
    });
    fixture = TestBed.createComponent(HomeAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
