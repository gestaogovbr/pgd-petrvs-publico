import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMontarComponent } from './editor-montar.component';

describe('EditorMontarComponent', () => {
  let component: EditorMontarComponent;
  let fixture: ComponentFixture<EditorMontarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorMontarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMontarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
