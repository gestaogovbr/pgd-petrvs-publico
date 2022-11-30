import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeListComponent } from './change-list.component';

describe('ChangeListComponent', () => {
  let component: ChangeListComponent;
  let fixture: ComponentFixture<ChangeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
