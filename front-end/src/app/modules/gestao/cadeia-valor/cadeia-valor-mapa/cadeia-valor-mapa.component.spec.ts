import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaValorMapaComponent } from './cadeia-valor-mapa.component';

describe('CadeiaValorMapaComponent', () => {
  let component: CadeiaValorMapaComponent;
  let fixture: ComponentFixture<CadeiaValorMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiaValorMapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeiaValorMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
