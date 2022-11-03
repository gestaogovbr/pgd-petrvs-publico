import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoFormFasesComponent } from './projeto-form-fases.component';

describe('ProjetoFormFasesComponent', () => {
  let component: ProjetoFormFasesComponent;
  let fixture: ComponentFixture<ProjetoFormFasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoFormFasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoFormFasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
