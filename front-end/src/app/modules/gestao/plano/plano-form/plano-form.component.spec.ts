import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoFormComponent } from './plano-form.component';

describe('PlanoFormComponent', () => {
  let component: PlanoFormComponent;
  let fixture: ComponentFixture<PlanoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
