import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaListComponent } from './demanda-list.component';

describe('DemandaListComponent', () => {
  let component: DemandaListComponent;
  let fixture: ComponentFixture<DemandaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
