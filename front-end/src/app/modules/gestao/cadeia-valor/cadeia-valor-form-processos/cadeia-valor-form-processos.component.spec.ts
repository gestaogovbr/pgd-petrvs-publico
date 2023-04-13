import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaValorFormProcessosComponent } from './cadeia-valor-form-processos.component';

describe('CadeiaValorFormProcessosComponent', () => {
  let component: CadeiaValorFormProcessosComponent;
  let fixture: ComponentFixture<CadeiaValorFormProcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiaValorFormProcessosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeiaValorFormProcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
