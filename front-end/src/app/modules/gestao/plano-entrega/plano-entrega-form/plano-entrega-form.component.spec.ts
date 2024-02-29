import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoEntregaFormComponent } from './plano-entrega-form.component';

describe('PlanoFormComponent', () => {
  let component: PlanoEntregaFormComponent;
  let fixture: ComponentFixture<PlanoEntregaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
