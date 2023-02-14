import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriadoListComponent } from './feriado-list.component';

describe('FeriadoListComponent', () => {
  let component: FeriadoListComponent;
  let fixture: ComponentFixture<FeriadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeriadoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeriadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
