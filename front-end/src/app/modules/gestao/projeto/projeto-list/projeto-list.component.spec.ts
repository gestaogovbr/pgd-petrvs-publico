import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoListComponent } from './projeto-list.component';

describe('ProjetoListComponent', () => {
  let component: ProjetoListComponent;
  let fixture: ComponentFixture<ProjetoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
