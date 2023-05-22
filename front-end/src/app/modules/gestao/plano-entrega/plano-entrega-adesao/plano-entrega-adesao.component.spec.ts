import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoEntregaAdesaoComponent } from './plano-entrega-adesao.component';

describe('PlanoFormComponent', () => {
  let component: PlanoEntregaAdesaoComponent;
  let fixture: ComponentFixture<PlanoEntregaAdesaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaAdesaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaAdesaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
