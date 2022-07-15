import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaListKanbanComponent } from './demanda-list-kanban.component';

describe('DemandaListKanbanComponent', () => {
  let component: DemandaListKanbanComponent;
  let fixture: ComponentFixture<DemandaListKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaListKanbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaListKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
