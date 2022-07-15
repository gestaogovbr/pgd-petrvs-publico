import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnExpandComponent } from './column-expand.component';

describe('ColumnExpandComponent', () => {
  let component: ColumnExpandComponent;
  let fixture: ComponentFixture<ColumnExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnExpandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
