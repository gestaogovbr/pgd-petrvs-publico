import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfastamentoListComponent } from './afastamento-list.component';

describe('AfastamentoListComponent', () => {
  let component: AfastamentoListComponent;
  let fixture: ComponentFixture<AfastamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfastamentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfastamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
