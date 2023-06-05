import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaListEntregaListComponent } from './plano-entrega-list-entrega-list.component';

describe('PlanoEntregaListEntregaListComponent', () => {
  let component: PlanoEntregaListEntregaListComponent;
  let fixture: ComponentFixture<PlanoEntregaListEntregaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaListEntregaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaListEntregaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
