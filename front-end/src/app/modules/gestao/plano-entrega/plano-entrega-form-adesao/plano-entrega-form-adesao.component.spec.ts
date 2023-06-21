import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoEntregaFormAdesaoComponent } from './plano-entrega-form-adesao.component';

describe('PlanoFormComponent', () => {
  let component: PlanoEntregaFormAdesaoComponent;
  let fixture: ComponentFixture<PlanoEntregaFormAdesaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaFormAdesaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaFormAdesaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
