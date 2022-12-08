import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoFormComponent } from './planejamento-form.component';

describe('PlanejamentoFormComponent', () => {
  let component: PlanejamentoFormComponent;
  let fixture: ComponentFixture<PlanejamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanejamentoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
