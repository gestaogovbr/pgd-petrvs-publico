import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoListComponent } from './planejamento-list.component';

describe('PlanejamentoListComponent', () => {
  let component: PlanejamentoListComponent;
  let fixture: ComponentFixture<PlanejamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanejamentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
