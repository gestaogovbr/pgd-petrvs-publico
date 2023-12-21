import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncaoFormComponent } from './funcao-form.component';

describe('FuncaoFormComponent', () => {
  let component: FuncaoFormComponent;
  let fixture: ComponentFixture<FuncaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
