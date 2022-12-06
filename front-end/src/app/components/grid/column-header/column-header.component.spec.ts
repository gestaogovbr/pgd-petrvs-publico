import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnHeaderComponent } from './column-header.component';

describe('ColumnHeaderComponent', () => {
  let component: ColumnHeaderComponent;
  let fixture: ComponentFixture<ColumnHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
