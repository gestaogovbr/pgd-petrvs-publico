import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAvaliacaoListComponent } from './tipo-avaliacao-list.component';

describe('TipoAvaliacaoListComponent', () => {
  let component: TipoAvaliacaoListComponent;
  let fixture: ComponentFixture<TipoAvaliacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAvaliacaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAvaliacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
