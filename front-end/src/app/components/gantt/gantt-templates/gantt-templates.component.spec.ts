import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttTemplatesComponent } from './gantt-templates.component';

describe('GanttTemplatesComponent', () => {
  let component: GanttTemplatesComponent;
  let fixture: ComponentFixture<GanttTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
