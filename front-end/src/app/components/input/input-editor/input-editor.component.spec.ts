import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEditorComponent } from './input-editor.component';

describe('InputEditorComponent', () => {
  let component: InputEditorComponent;
  let fixture: ComponentFixture<InputEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
