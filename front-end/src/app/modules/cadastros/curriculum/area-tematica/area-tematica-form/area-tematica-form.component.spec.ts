import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTematicaFormComponent } from './area-tematica-form.component';

describe('AreaTematicaFormComponent', () => {
  let component: AreaTematicaFormComponent;
  let fixture: ComponentFixture<AreaTematicaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaTematicaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTematicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
