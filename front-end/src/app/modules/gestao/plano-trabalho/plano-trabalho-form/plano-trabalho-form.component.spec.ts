import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTrabalhoFormComponent } from './plano-trabalho-form.component';

describe('PlanoTrabalhoFormComponent', () => {
  let component: PlanoTrabalhoFormComponent;
  let fixture: ComponentFixture<PlanoTrabalhoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTrabalhoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTrabalhoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
