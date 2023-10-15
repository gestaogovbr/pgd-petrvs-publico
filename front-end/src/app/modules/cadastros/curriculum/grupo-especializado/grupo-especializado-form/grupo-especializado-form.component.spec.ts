import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEspecializadoFormComponent } from './grupo-especializado-form.component';

describe('GrupoEspecializadoFormComponent', () => {
  let component: GrupoEspecializadoFormComponent;
  let fixture: ComponentFixture<GrupoEspecializadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoEspecializadoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoEspecializadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
