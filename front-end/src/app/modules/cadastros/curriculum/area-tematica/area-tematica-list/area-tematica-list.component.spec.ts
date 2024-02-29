import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTematicaListComponent } from './area-tematica-list.component';

describe('AreaTematicaListComponent', () => {
  let component: AreaTematicaListComponent;
  let fixture: ComponentFixture<AreaTematicaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaTematicaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTematicaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
