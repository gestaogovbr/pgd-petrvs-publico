import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCursoListComponent } from './tipo-curso-list.component';

describe('TipoCursoListComponent', () => {
  let component: TipoCursoListComponent;
  let fixture: ComponentFixture<TipoCursoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCursoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCursoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
