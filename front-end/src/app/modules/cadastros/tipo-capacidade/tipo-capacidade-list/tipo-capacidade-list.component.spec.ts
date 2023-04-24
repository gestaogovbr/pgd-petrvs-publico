import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCapacidadeListComponent } from './tipo-capacidade-list.component';

describe('TipoCapacidadeListComponent', () => {
  let component: TipoCapacidadeListComponent;
  let fixture: ComponentFixture<TipoCapacidadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCapacidadeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCapacidadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
