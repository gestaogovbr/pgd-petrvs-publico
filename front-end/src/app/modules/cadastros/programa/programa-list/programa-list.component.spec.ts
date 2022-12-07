import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaListComponent } from './programa-list.component';

describe('ProgramaListComponent', () => {
  let component: ProgramaListComponent;
  let fixture: ComponentFixture<ProgramaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
