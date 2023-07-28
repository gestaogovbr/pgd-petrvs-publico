import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoTrabalhoListEntregaComponent } from './plano-trabalho-list-entrega.component';

describe('PlanejamentoFormComponent', () => {
  let component: PlanoTrabalhoListEntregaComponent;
  let fixture: ComponentFixture<PlanoTrabalhoListEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTrabalhoListEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTrabalhoListEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
