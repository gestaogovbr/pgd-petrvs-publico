import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadeListComponent } from './capacidade-list.component';

describe('CapacidadeListComponent', () => {
  let component: CapacidadeListComponent;
  let fixture: ComponentFixture<CapacidadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacidadeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
