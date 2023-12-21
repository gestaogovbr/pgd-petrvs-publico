import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEspecializadoListComponent } from './grupo-especializado-list.component';

describe('GrupoEspecializadoListComponent', () => {
  let component: GrupoEspecializadoListComponent;
  let fixture: ComponentFixture<GrupoEspecializadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoEspecializadoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoEspecializadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
