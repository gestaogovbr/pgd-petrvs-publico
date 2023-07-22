import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeFormProrrogarComponent } from './atividade-form-prorrogar.component';

describe('AtividadeFormProrrogarComponent', () => {
  let component: AtividadeFormProrrogarComponent;
  let fixture: ComponentFixture<AtividadeFormProrrogarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeFormProrrogarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeFormProrrogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
