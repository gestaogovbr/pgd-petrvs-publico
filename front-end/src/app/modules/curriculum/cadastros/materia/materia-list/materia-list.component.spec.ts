import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaListComponent } from './materia-list.component';

describe('MateriaListComponent', () => {
  let component: MateriaListComponent;
  let fixture: ComponentFixture<MateriaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
