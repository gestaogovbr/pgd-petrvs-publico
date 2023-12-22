import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeListGridComponent } from './atividade-list-grid.component';

describe('AtividadeListGridComponent', () => {
  let component: AtividadeListGridComponent;
  let fixture: ComponentFixture<AtividadeListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeListGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
