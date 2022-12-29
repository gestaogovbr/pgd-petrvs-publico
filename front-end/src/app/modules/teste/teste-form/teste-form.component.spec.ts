import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteFormComponent } from './teste-form.component';

describe('testeFormComponent', () => {
  let component: TesteFormComponent;
  let fixture: ComponentFixture<TesteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
