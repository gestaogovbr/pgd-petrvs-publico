import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeListGridComponent } from './unidade-list-grid.component';

describe('UnidadeListGridComponent', () => {
  let component: UnidadeListGridComponent;
  let fixture: ComponentFixture<UnidadeListGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadeListGridComponent]
    });
    fixture = TestBed.createComponent(UnidadeListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
