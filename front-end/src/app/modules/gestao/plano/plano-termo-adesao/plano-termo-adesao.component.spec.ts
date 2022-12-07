import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTermoAdesaoComponent } from './plano-termo-adesao.component';

describe('PlanoTermoAdesaoComponent', () => {
  let component: PlanoTermoAdesaoComponent;
  let fixture: ComponentFixture<PlanoTermoAdesaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTermoAdesaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTermoAdesaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
