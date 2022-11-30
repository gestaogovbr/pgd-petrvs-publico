import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoPlanejamentoComponent } from './projeto-planejamento.component';

describe('ProjetoPlanejamentoComponent', () => {
  let component: ProjetoPlanejamentoComponent;
  let fixture: ComponentFixture<ProjetoPlanejamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoPlanejamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoPlanejamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
