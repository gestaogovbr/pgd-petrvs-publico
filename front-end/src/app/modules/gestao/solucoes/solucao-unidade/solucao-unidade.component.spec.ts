import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolucaoUnidadeComponent } from './solucao-unidade.component';


describe('SolucaoUnidadeComponent', () => {
  let component: SolucaoUnidadeComponent;
  let fixture: ComponentFixture<SolucaoUnidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolucaoUnidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolucaoUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
