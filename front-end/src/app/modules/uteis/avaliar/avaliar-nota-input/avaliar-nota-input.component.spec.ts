import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliarNotaInputComponent } from './avaliar-nota-input.component';

describe('AvaliarNotaInputComponent', () => {
  let component: AvaliarNotaInputComponent;
  let fixture: ComponentFixture<AvaliarNotaInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvaliarNotaInputComponent]
    });
    fixture = TestBed.createComponent(AvaliarNotaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
