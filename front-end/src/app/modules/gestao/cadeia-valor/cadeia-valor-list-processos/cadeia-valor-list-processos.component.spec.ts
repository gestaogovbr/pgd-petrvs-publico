import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaValorListProcessosComponent } from './cadeia-valor-list-processos.component';

describe('CadeiaValorFormProcessosComponent', () => {
  let component: CadeiaValorListProcessosComponent;
  let fixture: ComponentFixture<CadeiaValorListProcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiaValorListProcessosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeiaValorListProcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
