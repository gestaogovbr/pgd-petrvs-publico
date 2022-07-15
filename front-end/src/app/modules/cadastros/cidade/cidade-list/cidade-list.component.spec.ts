import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeListComponent } from './cidade-list.component';

describe('CidadeListComponent', () => {
  let component: CidadeListComponent;
  let fixture: ComponentFixture<CidadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidadeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
