import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFormComponent } from './panel-form.component';

describe('PanelFormComponent', () => {
  let component: PanelFormComponent;
  let fixture: ComponentFixture<PanelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
