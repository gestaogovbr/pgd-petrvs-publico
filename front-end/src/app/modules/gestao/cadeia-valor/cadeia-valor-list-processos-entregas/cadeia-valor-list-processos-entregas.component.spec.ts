import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaValorListProcessosEntregasComponent } from './cadeia-valor-list-processos-entregas.component';

describe('CadeiaValorListProcessosEntregasComponent', () => {
  let component: CadeiaValorListProcessosEntregasComponent;
  let fixture: ComponentFixture<CadeiaValorListProcessosEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiaValorListProcessosEntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeiaValorListProcessosEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
