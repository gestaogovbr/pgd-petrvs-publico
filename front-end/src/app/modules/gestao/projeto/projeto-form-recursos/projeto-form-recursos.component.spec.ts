import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoFormRecursosComponent } from './projeto-form-recursos.component';

describe('ProjetoFormRecursosComponent', () => {
  let component: ProjetoFormRecursosComponent;
  let fixture: ComponentFixture<ProjetoFormRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoFormRecursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoFormRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
