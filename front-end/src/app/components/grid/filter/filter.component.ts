import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { QueryContext } from 'src/app/dao/query-context';
import { QueryOptions } from 'src/app/dao/query-options';
import { Base } from 'src/app/models/base.model';
import { IFormGroupHelper } from 'src/app/services/form-helper.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ComponentBase } from '../../component-base';
import { GridComponent } from '../grid.component';
import { Observable, finalize } from 'rxjs';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    providers: [
        {
            provide: FormGroupDirective,
            useFactory: (self: FilterComponent) => {
                return self.formDirective!;
            },
            deps: [FilterComponent]
        }
    ],
    standalone: false
})
export class FilterComponent extends ComponentBase implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) formDirective?: FormGroupDirective;
  @Output() filterClear = new EventEmitter<void>();
  @Input() form?: FormGroup;
  @Input() filter?: (filter: FormGroup) => void;
  @Input() submit?: (filter: FormGroup) => QueryOptions | undefined | void;
  @Input() clear?: (filter: FormGroup) => void;
  @Input() where?: (filter: FormGroup) => any[];
  @Input() collapseChange?: (filter: FormGroup) => void;
  @Input() visible: boolean = true;
  @Input() deleted: boolean = false;
  @Input() deletedLabel: string = 'Mostrar os deletados';
  @Input() filterLabel: string = 'Filtrar';
  @Input() noButtons?: string;
  @Input() collapsed: boolean = true;
  @Input() hasExportExcel: boolean = false;
  @Input() grid?: GridComponent;
  @Input() query?: QueryContext<Base>;
  @Input() queryOptions?: QueryOptions;
  @Input() hidden?: string;
  @Input() exportExcel?: (form: any, queryOptions: QueryOptions) => Observable<any>;
  @Input() excelFileName: string = 'export.xlsx';
  @Input() exportExcelQueued: boolean = false;

  public deletedControl: FormControl = new FormControl(false);
  public exportingExcel: boolean = false;
  public dialog: DialogService;

  constructor(injector: Injector) {
    super(injector);
    this.dialog = injector.get<DialogService>(DialogService);
  }

  private get go(): NavigateService {
    return this.injector.get<NavigateService>(NavigateService);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.exportingExcel) {
      this.stopExcelExportFeedback();
    }
  }

  public getId(relativeId?: string): string {
    return this.grid?.getId(relativeId) || this.generatedId(relativeId);
  }

  public get isHidden(): boolean {
    return this.hidden != undefined; 
  }

  public get isNoButtons(): boolean {
    return this.noButtons !== undefined;
  }

  public toggle() {
    this.collapsed = !this.collapsed;
    if(this.collapseChange) this.collapseChange(this.form!);
  }

  public onDeletedChange(event: Event) {
    this.onButtonFilterClick();
  }

  public onButtonClearClick() {
    this.filterClear.emit();
    if(this.form) {
      if(this.clear) {
        this.clear(this.form);
      } else {
        this.form.reset((this.form as unknown as IFormGroupHelper).initialState);
      }
      this.onButtonFilterClick();
    }
  }

  public onButtonFilterClick() {
    if(this.filter) {
      this.filter(this.form!);
    } else {
      let queryOptions = this.submit ? this.submit(this.form!) : undefined;
      queryOptions = queryOptions || this.grid?.queryOptions || this.queryOptions || {};
      //if(this.deletedControl.value) queryOptions.deleted = true;
      queryOptions.deleted = this.deletedControl.value ? true : false;
      (this.grid?.query || this.query!).reload(queryOptions);
    }
  }

  public onButtonExcelClick() {
    let form: any = this.form!.value;
    let queryOptions = this.grid?.queryOptions || this.queryOptions || {};

    if (this.form!.valid && this.exportExcel && !this.exportingExcel) {
      const export$ = this.exportExcel(form, queryOptions);
      this.startExcelExportFeedback();
      export$.pipe(
        finalize(() => this.stopExcelExportFeedback())
      ).subscribe({
        next: (res) => {
          if (this.exportExcelQueued) {
            if (res) {
              this.showQueuedExportDialog();
            }
            return;
          }
          if (res && res.body) {
            const blob = new Blob([res.body], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.excelFileName;
            link.click();
            window.URL.revokeObjectURL(url);
          }
        },
        error: (error) => {
          console.log(error);
          this.dialog.alert(
            'Erro',
            this.exportExcelQueued
              ? 'Não foi possível solicitar a geração do relatório.'
              : 'Não foi possível gerar o arquivo Excel.'
          );
        }
      });
    }
  }

  private showQueuedExportDialog() {
    this.dialog.choose(
      'Exportação de Relatório',
      'A exportação do relatório foi iniciada e será processada em segundo plano. Acompanhe o andamento na página de Exportação de Relatórios. Você possui até 24 horas para efetuar o download.',
      [
        { label: 'Ir para Exportação de Relatórios', value: 'go', color: 'btn-success', icon: 'bi bi-box-arrow-up-right' },
        { label: 'Fechar', value: 'close', color: 'btn-outline-secondary' }
      ]
    ).then((button) => {
      if (button?.value === 'go') {
        this.go.openNewTab('/relatorios/exportacao');
      }
    });
  }

  private startExcelExportFeedback() {
    this.exportingExcel = true;
    if (this.grid) {
      this.grid.loading = true;
    }
    this.dialog.showSppinerOverlay(
      this.exportExcelQueued
        ? 'Solicitando a geração do relatório...'
        : 'O arquivo Excel está sendo gerado. Relatórios grandes podem levar alguns instantes.'
    );
    this.detectChanges();
  }

  private stopExcelExportFeedback() {
    this.dialog.closeSppinerOverlay();
    this.exportingExcel = false;
    if (this.grid) {
      this.grid.loading = false;
    }
    this.detectChanges();
  }
}
