import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoListEntregaComponent } from './plano-list-entrega.component';

describe('PlanejamentoFormComponent', () => {
  let component: PlanoListEntregaComponent;
  let fixture: ComponentFixture<PlanoListEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoListEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoListEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
