import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioItemTrabalhoListComponent } from './envio-item-trabalho-list.component';

describe('ErrorListComponent', () => {
  let component: EnvioItemTrabalhoListComponent;
  let fixture: ComponentFixture<EnvioItemTrabalhoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioItemTrabalhoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioItemTrabalhoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
