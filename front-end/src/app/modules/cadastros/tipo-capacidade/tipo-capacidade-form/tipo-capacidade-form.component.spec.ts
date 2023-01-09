import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCapacidadeFormComponent } from './tipo-capacidade-form.component';

describe('TipoCapacidadeFormComponent', () => {
  let component: TipoCapacidadeFormComponent;
  let fixture: ComponentFixture<TipoCapacidadeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCapacidadeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCapacidadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
