import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTrabalhoTermoAdesaoComponent } from './plano-trabalho-termo-adesao.component';

describe('PlanoTrabalhoTermoAdesaoComponent', () => {
  let component: PlanoTrabalhoTermoAdesaoComponent;
  let fixture: ComponentFixture<PlanoTrabalhoTermoAdesaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTrabalhoTermoAdesaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTrabalhoTermoAdesaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
