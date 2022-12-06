import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaListComponent } from './entrega-list.component';

describe('EntregaListComponent', () => {
  let component: EntregaListComponent;
  let fixture: ComponentFixture<EntregaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
