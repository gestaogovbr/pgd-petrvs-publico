import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroprocessoListComponent } from './macroprocesso-list.component';

describe('MacroprocessoListComponent', () => {
  let component: MacroprocessoListComponent;
  let fixture: ComponentFixture<MacroprocessoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacroprocessoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroprocessoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
