import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoFormTermoComponent } from './plano-form-termo.component';

describe('PlanoFormTermoComponent', () => {
  let component: PlanoFormTermoComponent;
  let fixture: ComponentFixture<PlanoFormTermoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoFormTermoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoFormTermoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
