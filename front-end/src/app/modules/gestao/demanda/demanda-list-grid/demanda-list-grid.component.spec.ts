import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaListGridComponent } from './demanda-list-grid.component';

describe('DemandaListGridComponent', () => {
  let component: DemandaListGridComponent;
  let fixture: ComponentFixture<DemandaListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaListGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
