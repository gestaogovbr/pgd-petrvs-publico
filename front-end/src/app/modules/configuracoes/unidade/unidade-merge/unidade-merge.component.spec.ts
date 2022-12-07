import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeMergeComponent } from './unidade-merge.component';

describe('UnidadeMergeComponent', () => {
  let component: UnidadeMergeComponent;
  let fixture: ComponentFixture<UnidadeMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadeMergeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
