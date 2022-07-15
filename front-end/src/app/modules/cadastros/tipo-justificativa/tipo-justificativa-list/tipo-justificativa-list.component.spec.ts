import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoJustificativaListComponent } from './tipo-justificativa-list.component';

describe('TipoJustificativaListComponent', () => {
  let component: TipoJustificativaListComponent;
  let fixture: ComponentFixture<TipoJustificativaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoJustificativaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoJustificativaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
