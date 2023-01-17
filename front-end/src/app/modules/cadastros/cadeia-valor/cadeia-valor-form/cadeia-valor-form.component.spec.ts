import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaValorFormComponent } from './cadeia-valor-form.component';

describe('CadeiaValorFormComponent', () => {
  let component: CadeiaValorFormComponent;
  let fixture: ComponentFixture<CadeiaValorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiaValorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeiaValorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
