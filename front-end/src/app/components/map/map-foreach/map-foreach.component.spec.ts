import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapForeachComponent } from './map-foreach.component';

describe('MapForeachComponent', () => {
  let component: MapForeachComponent;
  let fixture: ComponentFixture<MapForeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapForeachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapForeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
