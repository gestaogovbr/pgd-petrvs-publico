import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { UtilService } from 'src/app/services/util.service';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let dialog: jasmine.SpyObj<DialogService>;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj<DialogService>('DialogService', [
      'showSppinerOverlay',
      'closeSppinerOverlay',
      'alert'
    ]);
    dialog.alert.and.resolveTo();

    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      providers: [
        { provide: 'ID_GENERATOR_BASE', useValue: 'test' },
        { provide: DialogService, useValue: dialog },
        { provide: UtilService, useValue: { onlyAlphanumeric: (value: string) => value } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mostra overlay enquanto o Excel está sendo gerado e fecha ao concluir', fakeAsync(() => {
    const exportSubject = new Subject<any>();
    component.exportExcel = () => exportSubject.asObservable();
    component.grid = { loading: false } as any;

    component.onButtonExcelClick();

    expect(dialog.showSppinerOverlay).toHaveBeenCalledWith(
      'O arquivo Excel está sendo gerado. Relatórios grandes podem levar alguns instantes.'
    );
    expect(component.exportingExcel).toBeTrue();
    expect(component.grid!.loading).toBeTrue();

    exportSubject.next({ body: null });
    exportSubject.complete();
    tick();

    expect(dialog.closeSppinerOverlay).toHaveBeenCalled();
    expect(component.exportingExcel).toBeFalse();
    expect(component.grid!.loading).toBeFalse();
  }));

  it('fecha o overlay e alerta quando a geração do Excel falha', fakeAsync(() => {
    component.exportExcel = () => throwError(() => new Error('falha'));

    component.onButtonExcelClick();
    tick();

    expect(dialog.showSppinerOverlay).toHaveBeenCalled();
    expect(dialog.closeSppinerOverlay).toHaveBeenCalled();
    expect(dialog.alert).toHaveBeenCalledWith('Erro', 'Não foi possível gerar o arquivo Excel.');
    expect(component.exportingExcel).toBeFalse();
  }));

  it('não inicia uma segunda exportação enquanto a anterior está em andamento', () => {
    const exportSubject = new Subject<any>();
    const exportExcel = jasmine.createSpy('exportExcel').and.returnValue(exportSubject.asObservable());
    component.exportExcel = exportExcel;

    component.onButtonExcelClick();
    component.onButtonExcelClick();

    expect(exportExcel).toHaveBeenCalledTimes(1);
  });
});
