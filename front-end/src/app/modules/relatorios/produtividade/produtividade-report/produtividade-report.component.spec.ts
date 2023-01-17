import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutividadeReportComponent } from './produtividade-report.component';

describe('ProdutividadeReportComponent', () => {
  let component: ProdutividadeReportComponent;
  let fixture: ComponentFixture<ProdutividadeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutividadeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutividadeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
