import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadeTecnicaListComponent } from './capacidade-tecnica-list.component';

describe('CapacidadeTecnicaListComponent', () => {
  let component: CapacidadeTecnicaListComponent;
  let fixture: ComponentFixture<CapacidadeTecnicaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacidadeTecnicaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadeTecnicaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
