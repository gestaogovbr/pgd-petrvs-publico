import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdesaoFormTermoComponent } from './adesao-form-termo.component';

describe('AdesaoFormTermoComponent', () => {
  let component: AdesaoFormTermoComponent;
  let fixture: ComponentFixture<AdesaoFormTermoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdesaoFormTermoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdesaoFormTermoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
