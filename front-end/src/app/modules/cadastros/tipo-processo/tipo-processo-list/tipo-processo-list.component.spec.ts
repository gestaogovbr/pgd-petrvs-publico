import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProcessoListComponent } from './tipo-processo-list.component';

describe('TipoProcessoListComponent', () => {
  let component: TipoProcessoListComponent;
  let fixture: ComponentFixture<TipoProcessoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoProcessoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProcessoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
