import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaEntregaListComponent } from './plano-entrega-entrega-list.component';

describe('PlanoEntregaEntregaListComponent', () => {
  let component: PlanoEntregaEntregaListComponent;
  let fixture: ComponentFixture<PlanoEntregaEntregaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaEntregaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaEntregaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
