import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioItemListComponent } from './envio-item-list.component';

describe('ErrorListComponent', () => {
  let component: EnvioItemListComponent;
  let fixture: ComponentFixture<EnvioItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioItemListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
