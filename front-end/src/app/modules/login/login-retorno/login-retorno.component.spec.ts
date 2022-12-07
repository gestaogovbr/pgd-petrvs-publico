import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRetornoComponent } from './login-retorno.component';

describe('LoginRetornoComponent', () => {
  let component: LoginRetornoComponent;
  let fixture: ComponentFixture<LoginRetornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRetornoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
