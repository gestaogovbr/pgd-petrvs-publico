import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTrabalhoListAccordeonComponent } from './plano-trabalho-list-accordeon.component';

describe('PlanoTrabalhoListAccordeonComponent', () => {
  let component: PlanoTrabalhoListAccordeonComponent;
  let fixture: ComponentFixture<PlanoTrabalhoListAccordeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTrabalhoListAccordeonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTrabalhoListAccordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
