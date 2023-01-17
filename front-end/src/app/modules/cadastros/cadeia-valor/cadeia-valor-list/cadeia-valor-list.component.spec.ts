import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaValorListComponent } from './cadeia-valor-list.component';

describe('CadeiaValorListComponent', () => {
  let component: CadeiaValorListComponent;
  let fixture: ComponentFixture<CadeiaValorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiaValorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeiaValorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
