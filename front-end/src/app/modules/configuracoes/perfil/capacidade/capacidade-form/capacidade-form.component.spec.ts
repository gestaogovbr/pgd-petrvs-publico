import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadeFormComponent } from './capacidade-form.component';

describe('CapacidadeFormComponent', () => {
  let component: CapacidadeFormComponent;
  let fixture: ComponentFixture<CapacidadeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacidadeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
