import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProjetosComponent } from './home-projetos.component';

describe('HomeProjetosComponent', () => {
  let component: HomeProjetosComponent;
  let fixture: ComponentFixture<HomeProjetosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeProjetosComponent]
    });
    fixture = TestBed.createComponent(HomeProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
