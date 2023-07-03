import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaListLogsComponent } from './plano-entrega-list-logs.component';

describe('PlanoEntregaListLogsComponent', () => {
  let component: PlanoEntregaListLogsComponent;
  let fixture: ComponentFixture<PlanoEntregaListLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaListLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaListLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
