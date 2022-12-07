import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadeListComponent } from './entidade-list.component';

describe('EntidadeListComponent', () => {
  let component: EntidadeListComponent;
  let fixture: ComponentFixture<EntidadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntidadeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
