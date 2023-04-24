import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoFormRegrasComponent } from './projeto-form-regras.component';

describe('ProjetoFormRegrasComponent', () => {
  let component: ProjetoFormRegrasComponent;
  let fixture: ComponentFixture<ProjetoFormRegrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoFormRegrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoFormRegrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
