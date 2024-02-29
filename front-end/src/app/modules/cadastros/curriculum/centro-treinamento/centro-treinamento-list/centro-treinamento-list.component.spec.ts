import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroTreinamentoListComponent } from './centro-treinamento-list.component';

describe('CentroTreinamentoListComponent', () => {
  let component: CentroTreinamentoListComponent;
  let fixture: ComponentFixture<CentroTreinamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroTreinamentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroTreinamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
