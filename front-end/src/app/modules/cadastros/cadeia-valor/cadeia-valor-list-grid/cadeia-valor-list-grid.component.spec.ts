import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaValorListGridComponent } from './cadeia-valor-list-grid.component';

describe('CadeiaValorListGridComponent', () => {
  let component: CadeiaValorListGridComponent;
  let fixture: ComponentFixture<CadeiaValorListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiaValorListGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeiaValorListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
