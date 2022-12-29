import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcaDeTrabalhoReportServidorComponent } from './forcadetrabalho-report-servidor.component';

describe('ProdutividadeReportServidorComponent', () => {
  let component: ForcaDeTrabalhoReportServidorComponent;
  let fixture: ComponentFixture<ForcaDeTrabalhoReportServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcaDeTrabalhoReportServidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcaDeTrabalhoReportServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
