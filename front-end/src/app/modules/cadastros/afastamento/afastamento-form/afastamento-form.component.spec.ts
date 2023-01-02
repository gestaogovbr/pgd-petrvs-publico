import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfastamentoFormComponent } from './afastamento-form.component';

describe('AfastamentoFormComponent', () => {
  let component: AfastamentoFormComponent;
  let fixture: ComponentFixture<AfastamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfastamentoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfastamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
