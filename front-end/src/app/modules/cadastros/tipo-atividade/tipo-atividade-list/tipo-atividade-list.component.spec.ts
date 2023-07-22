import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAtividadeListComponent } from './tipo-atividade-list.component';

describe('AtividadeListComponent', () => {
  let component: TipoAtividadeListComponent;
  let fixture: ComponentFixture<TipoAtividadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAtividadeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAtividadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
