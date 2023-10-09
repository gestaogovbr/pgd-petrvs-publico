import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTrabalhoEntregaAtividadesComponent } from './plano-trabalho-entrega-atividades.component';

describe('PlanoTrabalhoEntregaAtividadesComponent', () => {
  let component: PlanoTrabalhoEntregaAtividadesComponent;
  let fixture: ComponentFixture<PlanoTrabalhoEntregaAtividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoTrabalhoEntregaAtividadesComponent]
    });
    fixture = TestBed.createComponent(PlanoTrabalhoEntregaAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
