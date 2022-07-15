import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotacaoListComponent } from './lotacao-list.component';

describe('LotacaoListComponent', () => {
  let component: LotacaoListComponent;
  let fixture: ComponentFixture<LotacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotacaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
