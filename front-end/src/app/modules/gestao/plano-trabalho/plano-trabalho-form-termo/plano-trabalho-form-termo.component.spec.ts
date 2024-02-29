import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTrabalhoFormTermoComponent } from './plano-trabalho-form-termo.component';

describe('PlanoTrabalhoFormTermoComponent', () => {
  let component: PlanoTrabalhoFormTermoComponent;
  let fixture: ComponentFixture<PlanoTrabalhoFormTermoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTrabalhoFormTermoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTrabalhoFormTermoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
