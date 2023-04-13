import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaioxPessoalComponent } from './raiox-pessoal.component';

describe('RaioxPessoalComponent', () => {
  let component: RaioxPessoalComponent;
  let fixture: ComponentFixture<RaioxPessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaioxPessoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaioxPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
