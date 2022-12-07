import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaFormComponent } from './programa-form.component';

describe('ProgramaFormComponent', () => {
  let component: ProgramaFormComponent;
  let fixture: ComponentFixture<ProgramaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
