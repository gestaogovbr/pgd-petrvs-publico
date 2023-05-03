import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanejamentoListObjetivoComponent } from './planejamento-list-objetivo.component';

describe('PlanejamentoFormComponent', () => {
  let component: PlanejamentoListObjetivoComponent;
  let fixture: ComponentFixture<PlanejamentoListObjetivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanejamentoListObjetivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoListObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
