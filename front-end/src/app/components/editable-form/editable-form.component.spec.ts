import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableFormComponent } from './editable-form.component';

describe('EditableFormComponent', () => {
  let component: EditableFormComponent;
  let fixture: ComponentFixture<EditableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
