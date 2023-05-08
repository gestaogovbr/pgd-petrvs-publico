import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoEntregaListEntregaComponent } from './plano-entrega-list-entrega.component';

describe('PlanoEntregaListEntregaComponent', () => {
  let component: PlanoEntregaListEntregaComponent;
  let fixture: ComponentFixture<PlanoEntregaListEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaListEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaListEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
