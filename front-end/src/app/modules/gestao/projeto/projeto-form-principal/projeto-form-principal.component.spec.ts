import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoFormPrincipalComponent } from './projeto-form-principal.component';

describe('ProjetoFormPrincipalComponent', () => {
  let component: ProjetoFormPrincipalComponent;
  let fixture: ComponentFixture<ProjetoFormPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoFormPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoFormPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
