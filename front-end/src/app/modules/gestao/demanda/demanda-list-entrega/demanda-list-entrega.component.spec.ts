import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaListEntregaComponent } from './demanda-list-entrega.component';

describe('DemandaListEntregaComponent', () => {
  let component: DemandaListEntregaComponent;
  let fixture: ComponentFixture<DemandaListEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaListEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaListEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
