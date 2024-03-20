import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCursoFormComponent } from './tipo-curso-form.component';

describe('TipoCursoFormComponent', () => {
  let component: TipoCursoFormComponent;
  let fixture: ComponentFixture<TipoCursoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCursoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCursoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
