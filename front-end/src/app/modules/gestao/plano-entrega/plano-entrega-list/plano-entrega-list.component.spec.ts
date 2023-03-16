import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoEntregaListComponent } from './plano-entrega-list.component';

describe('PlanoEntregaListComponent', () => {
  let component: PlanoEntregaListComponent;
  let fixture: ComponentFixture<PlanoEntregaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoEntregaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoEntregaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
