import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdesaoFormComponent } from './adesao-form.component';

describe('AdesaoFormComponent', () => {
  let component: AdesaoFormComponent;
  let fixture: ComponentFixture<AdesaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdesaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdesaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
