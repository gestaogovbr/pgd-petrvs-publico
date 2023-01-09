import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcaDeTrabalhoFilterServidorComponent } from './forcadetrabalho-filter-servidor.component';

describe('ProdutividadeFilterServidorComponent', () => {
  let component: ForcaDeTrabalhoFilterServidorComponent;
  let fixture: ComponentFixture<ForcaDeTrabalhoFilterServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcaDeTrabalhoFilterServidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcaDeTrabalhoFilterServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
