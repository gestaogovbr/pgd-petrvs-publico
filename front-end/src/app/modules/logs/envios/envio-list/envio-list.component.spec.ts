import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioListComponent } from './envio-list.component';

describe('ErrorListComponent', () => {
  let component: EnvioListComponent;
  let fixture: ComponentFixture<EnvioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
