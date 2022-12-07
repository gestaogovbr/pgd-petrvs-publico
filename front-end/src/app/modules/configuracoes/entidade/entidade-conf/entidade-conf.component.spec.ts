import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadeConfComponent } from './entidade-conf.component';

describe('EntidadeConfComponent', () => {
  let component: EntidadeConfComponent;
  let fixture: ComponentFixture<EntidadeConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntidadeConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadeConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
