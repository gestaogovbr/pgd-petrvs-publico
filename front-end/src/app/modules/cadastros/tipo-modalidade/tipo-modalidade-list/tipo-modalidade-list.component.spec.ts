import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoModalidadeListComponent } from './tipo-modalidade-list.component';

describe('TipoModalidadeListComponent', () => {
  let component: TipoModalidadeListComponent;
  let fixture: ComponentFixture<TipoModalidadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoModalidadeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoModalidadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
