import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAtividadeFormComponent } from './tipo-atividade-form.component';

describe('TipoAtividadeFormComponent', () => {
  let component: TipoAtividadeFormComponent;
  let fixture: ComponentFixture<TipoAtividadeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAtividadeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAtividadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
