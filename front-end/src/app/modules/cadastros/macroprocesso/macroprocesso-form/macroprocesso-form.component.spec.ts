import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroprocessoFormComponent } from './macroprocesso-form.component';

describe('MacroprocessoFormComponent', () => {
  let component: MacroprocessoFormComponent;
  let fixture: ComponentFixture<MacroprocessoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacroprocessoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroprocessoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
