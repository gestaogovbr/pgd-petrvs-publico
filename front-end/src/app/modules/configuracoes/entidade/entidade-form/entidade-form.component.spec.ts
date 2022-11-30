import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadeFormComponent } from './entidade-form.component';

describe('EntidadeFormComponent', () => {
  let component: EntidadeFormComponent;
  let fixture: ComponentFixture<EntidadeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntidadeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
