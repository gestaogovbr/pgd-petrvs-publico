import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaValorListMapComponent } from './cadeia-valor-list-map.component';

describe('CadeiaValorListMapComponent', () => {
  let component: CadeiaValorListMapComponent;
  let fixture: ComponentFixture<CadeiaValorListMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiaValorListMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeiaValorListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
