import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaioxPessoalFormComponent } from './raiox-pessoal-form.component';

describe('RaioxPessoalFormComponent', () => {
  let component: RaioxPessoalFormComponent;
  let fixture: ComponentFixture<RaioxPessoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaioxPessoalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaioxPessoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
