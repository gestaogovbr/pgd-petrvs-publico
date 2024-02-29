import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSuporteComponent } from './menu-suporte.component';

describe('MenuSuporteComponent', () => {
  let component: MenuSuporteComponent;
  let fixture: ComponentFixture<MenuSuporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuSuporteComponent]
    });
    fixture = TestBed.createComponent(MenuSuporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
