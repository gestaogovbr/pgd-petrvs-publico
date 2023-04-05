import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaValorListProcessoComponent } from './cadeia-valor-list-processo.component';

describe('CadeiaValorListProcessoComponent', () => {
  let component: CadeiaValorListProcessoComponent;
  let fixture: ComponentFixture<CadeiaValorListProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiaValorListProcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeiaValorListProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
