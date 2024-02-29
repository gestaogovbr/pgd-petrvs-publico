import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeListComponent } from './atividade-dashboard.component';

describe('AtividadeListComponent', () => {
  let component: AtividadeListComponent;
  let fixture: ComponentFixture<AtividadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
