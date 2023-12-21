import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeListMapComponent } from './unidade-list-map.component';

describe('UnidadeListMapComponent', () => {
  let component: UnidadeListMapComponent;
  let fixture: ComponentFixture<UnidadeListMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadeListMapComponent]
    });
    fixture = TestBed.createComponent(UnidadeListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
