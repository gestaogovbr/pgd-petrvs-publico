import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcaDeTrabalhoFilterAreaComponent } from './forcadetrabalho-filter-area.component';

describe('ProdutividadeFilterServidorComponent', () => {
  let component: ForcaDeTrabalhoFilterAreaComponent;
  let fixture: ComponentFixture<ForcaDeTrabalhoFilterAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcaDeTrabalhoFilterAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcaDeTrabalhoFilterAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
