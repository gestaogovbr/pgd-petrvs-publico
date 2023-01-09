import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotacaoFormComponent } from './lotacao-form.component';

describe('LotacaoFormComponent', () => {
  let component: LotacaoFormComponent;
  let fixture: ComponentFixture<LotacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotacaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
