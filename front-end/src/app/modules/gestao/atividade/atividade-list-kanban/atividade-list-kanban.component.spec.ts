import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeListKanbanComponent } from './atividade-list-kanban.component';

describe('AtividadeListKanbanComponent', () => {
  let component: AtividadeListKanbanComponent;
  let fixture: ComponentFixture<AtividadeListKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeListKanbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeListKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
