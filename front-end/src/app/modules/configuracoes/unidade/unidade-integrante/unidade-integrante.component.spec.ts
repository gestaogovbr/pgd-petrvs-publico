import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeIntegranteComponent } from './unidade-integrante.component';

describe('UnidadeIntegranteComponent', () => {
  let component: UnidadeIntegranteComponent;
  let fixture: ComponentFixture<UnidadeIntegranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadeIntegranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeIntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
