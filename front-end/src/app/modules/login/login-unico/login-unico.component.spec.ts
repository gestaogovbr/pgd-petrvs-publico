import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUnicoComponent } from './login-unico.component';

describe('LoginRetornoComponent', () => {
  let component: LoginUnicoComponent;
  let fixture: ComponentFixture<LoginUnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
