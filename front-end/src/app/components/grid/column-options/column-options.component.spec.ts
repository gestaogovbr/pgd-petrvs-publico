import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnOptionsComponent } from './column-options.component';

describe('ColumnOptionsComponent', () => {
  let component: ColumnOptionsComponent;
  let fixture: ComponentFixture<ColumnOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
