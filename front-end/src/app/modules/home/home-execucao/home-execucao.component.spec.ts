import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExecucaoComponent } from './home-execucao.component';

describe('HomeExecucaoComponent', () => {
  let component: HomeExecucaoComponent;
  let fixture: ComponentFixture<HomeExecucaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeExecucaoComponent]
    });
    fixture = TestBed.createComponent(HomeExecucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
