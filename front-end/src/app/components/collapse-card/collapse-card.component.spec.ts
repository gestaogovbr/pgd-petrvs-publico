import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseCardComponent } from './collapse-card.component';

describe('CollapseCardComponent', () => {
  let component: CollapseCardComponent;
  let fixture: ComponentFixture<CollapseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
