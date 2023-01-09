import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdesaoListComponent } from './adesao-list.component';

describe('AdesaoListComponent', () => {
  let component: AdesaoListComponent;
  let fixture: ComponentFixture<AdesaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdesaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdesaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
