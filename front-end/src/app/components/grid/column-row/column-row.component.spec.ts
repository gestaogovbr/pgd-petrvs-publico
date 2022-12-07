import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnRowComponent } from './column-row.component';

describe('ColumnRowComponent', () => {
  let component: ColumnRowComponent;
  let fixture: ComponentFixture<ColumnRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
