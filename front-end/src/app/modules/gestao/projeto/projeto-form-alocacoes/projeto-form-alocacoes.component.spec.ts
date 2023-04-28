import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoFormAlocacoesComponent } from './projeto-form-alocacoes.component';

describe('ProjetoFormAlocacoesComponent', () => {
  let component: ProjetoFormAlocacoesComponent;
  let fixture: ComponentFixture<ProjetoFormAlocacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoFormAlocacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoFormAlocacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
