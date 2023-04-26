import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutividadeFilterComponent } from './produtividade-filter.component';

describe('ProdutividadeFilterComponent', () => {
  let component: ProdutividadeFilterComponent;
  let fixture: ComponentFixture<ProdutividadeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutividadeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutividadeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
