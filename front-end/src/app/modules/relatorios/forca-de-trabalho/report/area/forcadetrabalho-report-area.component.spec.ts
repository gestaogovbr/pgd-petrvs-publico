import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcaDeTrabalhoReportAreaComponent } from './forcadetrabalho-report-area.component';

describe('ProdutividadeReportServidorComponent', () => {
  let component: ForcaDeTrabalhoReportAreaComponent;
  let fixture: ComponentFixture<ForcaDeTrabalhoReportAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcaDeTrabalhoReportAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcaDeTrabalhoReportAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
