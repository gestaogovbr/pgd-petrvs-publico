import { ChangeDetectorRef, Component, ContentChild, ContentChildren, EventEmitter, HostBinding, Injector, Input, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DaoBaseService, QueryOrderBy } from 'src/app/dao/dao-base.service';
import { QueryContext } from 'src/app/dao/query-context';
import { QueryOptions } from 'src/app/dao/query-options';
import { Base, IIndexable } from 'src/app/models/base.model';
import { DialogService } from 'src/app/services/dialog.service';
import { IFormGroupHelper } from 'src/app/services/form-helper.service';
import { FullRoute, NavigateService, RouteMetadata } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';
import { ComponentBase } from '../component-base';
import { ToolbarButton, ToolbarComponent } from '../toolbar/toolbar.component';
import { ColumnComponent } from './column/column.component';
import { ColumnsComponent } from './columns/columns.component';
import { FilterComponent } from './filter/filter.component';
import { GridColumn } from './grid-column';
import { PaginationComponent } from './pagination/pagination.component';
import { ReportComponent } from './report/report.component';

export type GroupBy = {field: string, label: string, value?: any};

export class GridGroupSeparator {
  constructor(public group: GroupBy[]) {}
  public metadata: any = undefined;
  public get text(): string {
    return this.group.map(x => x.value).join(" - ");
  }
}

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [
    {
      provide: FormGroupDirective,
      useFactory: (self: GridComponent) => {
        return self.formDirective!;
      },
      deps: [GridComponent]
    }
  ]
})
export class GridComponent extends ComponentBase implements OnInit {
  //@ContentChildren(ColumnComponent, { descendants: true }) columnsRef?: QueryList<ColumnComponent>;
  @ContentChild(ColumnsComponent) columnsRef?: ColumnsComponent;
  @ContentChild(ReportComponent) reportRef?: ReportComponent;
  @ContentChild(FilterComponent) filterRef?: FilterComponent;
  @ContentChild(ToolbarComponent) toolbarRef?: ToolbarComponent;
  @ContentChild(PaginationComponent) paginationRef?: PaginationComponent;
  @ViewChild(FormGroupDirective) formDirective?: FormGroupDirective;
  @Output() select = new EventEmitter<Base | IIndexable | null>();
  @Input() dao?: DaoBaseService<Base>;
  @Input() icon: string = "";
  @Input() selectable: boolean = false;
  @Input() loadList?: (rows?: Base[]) => Promise<void> | void;
  @Input() multiselectChange?: (multiselected: IIndexable) => void;
  @Input() add?: () => Promise<IIndexable | undefined | void>;
  @Input() load?: (form: FormGroup, row: any) => Promise<void>;
  @Input() remove?: (row: any) => Promise<boolean | undefined | void>;
  @Input() save?: (form: FormGroup, row: any) => Promise<IIndexable | Base | undefined | void>;
  @Input() editEnd?: (id?: string) => void;
  @Input() addRoute?: FullRoute;
  @Input() addMetadata?: RouteMetadata;
  @Input() labelAdd: string = "Incluir";
  @Input() orderBy?: QueryOrderBy[];
  @Input() groupBy?: GroupBy[];
  @Input() join: string[] = [];
  @Input() form: FormGroup = new FormGroup({});
  @Input() editable?: string;
  @Input() hasEdit: boolean = true;
  @Input() hasDelete: boolean = false;
  @Input() hasReport: boolean = true;
  @Input() scrollable: boolean = false;
  @Input() controlName: string | null = null;
  @Input() control?: AbstractControl = undefined;
  @Input() minHeight: number = 300;
  @Input() multiselect?: string;
  @Input() multiselectEnabled?: string;
  @Input() multiselectAllFields: string[] = [];
  @Input() canSelect?: (row: IIndexable) => boolean;
  @Input() dynamicMultiselectMenu?: (multiselected: IIndexable) => ToolbarButton[];
  @Input() multiselectMenu?: ToolbarButton[];
  @Input() groupTemplate?: TemplateRef<unknown>;
  @Input() set title(value: string) {
    if(value != this._title) {
      this._title = value;
      if(this.toolbarRef) this.toolbarRef.title = value;
    }
  }
  get title(): string {
    return this._title;
  }
  @Input() set hasAdd(value: boolean) {
    if(value !== this._hasAdd) {
      this._hasAdd = value;
      this.reset();
    }
  }
  get hasAdd(): boolean {
    return this._hasAdd;
  }
  @Input() set disabled(value: string | undefined) {
    if(value != this._disabled) {
      this._disabled = value;
      this.reset();
    }
  }
  get disabled(): string | undefined {
    return this._disabled;
  }
  @Input() set query(value: QueryContext<Base> | undefined) {
    this._query = value;
    if(this.paginationRef) {
      this.paginationRef.query = value;
      this.paginationRef.cdRef.detectChanges();
    }
    if(value) {
      this.list = value.subject.asObservable();
    }
  }
  get query(): QueryContext<Base> | undefined {
    return this._query;
  }
  @Input() set list(value: Observable<any[]> | undefined) {
    this._list = value;
    if(value) value.subscribe(async rows => {
      if(this.loadList) await this.loadList(rows);
      this.items = rows;
      this.selected = undefined;
      this.cdRef.detectChanges();
    }, error => this.error = error.message || error.toString());
  }
  get list(): Observable<any[]> | undefined {
    return this._list;
  }
  @Input() set items(value: IIndexable[]) {
    this._items = value;
    this.group(value);
    this.control?.setValue(value);
    this.cdRef.detectChanges();
  }
  get items(): IIndexable[] {
    return this.control?.value || this._items || [];
  }
  @Input() set visible(value: boolean) {
    this._visible = value;
    this.cdRef.detectChanges();
  }
  get visible(): boolean {
    return this._visible;
  }

  /* Propriedades private e métodos get e set */
  private _query?: QueryContext<Base>;
  private _list?: Observable<any[]>;
  private _error?: string;
  private _disabled?: string;
  private _hasAdd: boolean = true;
  private _title: string = "";
  private _items?: IIndexable[];
  private _visible: boolean = true;
  private _exporting: boolean = false;
  //private _multiselectDynamicMenu: ToolbarButton[] = [];
  private filterCollapsedOnMultiselect: boolean = false;

  /* Propriedades publicas */
  public self: GridComponent = this;
  public columns: GridColumn[] = [];
  public toolbarButtons: ToolbarButton[] = [];
  public initialButtons?: ToolbarButton[];
  public go: NavigateService;
  public dialog: DialogService;
  public selected?: Base | IIndexable;
  public editing?: Base | IIndexable;
  public editingColumn?: Base | IIndexable;
  public adding: boolean = false;
  public multiselecting: boolean = false;
  public multiselected: IIndexable = {};
  public multiselectExtra: any = undefined;
  public rowsLimit?: number;
  public groupIds: IIndexable = { _qtdRows: -1 };
  public expandedIds: IIndexable = {};
  public metadatas: IIndexable = {};
  public set error(error: string | undefined) {
    this._error = error;
  }
  public get error(): string | undefined {
    return this._error;
  }
  public set exporting(value: boolean) {
    if(value != this._exporting) {
      this._exporting = value;
      value ? this.dialog.showSppinerOverlay("Exportando dados...") : this.dialog.closeSppinerOverlay();
    }
  }
  public get exporting(): boolean {
    return this._exporting;
  }
  public BUTTON_FILTER: ToolbarButton = {
    icon: "bi bi-search",
    label: "Filtros",
    onClick: () => this.filterRef?.toggle()
  };
  public addToolbarButtonClick = (async () => await (this.add ? this.add() : this.go.navigate(this.addRoute!, this.addMetadata))).bind(this);
  public BUTTON_ADD: ToolbarButton = {
    icon: "bi bi-plus-circle",
    color: "btn-outline-success",
    label: this.labelAdd,
    onClick: this.addToolbarButtonClick
  };
  public BUTTON_REPORT: ToolbarButton = {
    icon: "bi-file-earmark-spreadsheet",
    color: "btn-outline-info",
    label: "Exportar",
    onClick: () => this.report()
  };
  public BUTTON_EDIT: ToolbarButton = {
    label: "Editar",
    icon: "bi bi-pencil-square",
    hint: "Editar",
    color: "btn-outline-info",
  };
  public BUTTON_DELETE: ToolbarButton = {
    label: "Excluir",
    icon: "bi bi-trash",
    hint: "Excluir",
    color: "btn-outline-danger",
  };
  public BUTTON_MULTISELECT_SELECIONAR: string = "Selecionar";
  public BUTTON_MULTISELECT_CANCELAR_SELECAO: string = "Cancelar seleção";
  public BUTTON_MULTISELECT: ToolbarButton = {
    label: "Selecionar",
    icon: "bi bi-ui-checks-grid",
    hint: "Excluir",
    toggle: true,
    pressed: false,
    color: "btn-outline-danger",
    onClick: this.onMultiselectClick.bind(this),
    items: [
      {
        label: "Todos",
        icon: "bi bi-grid-fill",
        hint: "Selecionar",
        color: "btn-outline-danger",
        onClick: this.onSelectAllClick.bind(this)
      }, {
        label: "Nenhum",
        icon: "bi bi-grid",
        hint: "Selecionar",
        color: "btn-outline-danger",
        onClick: this.onUnselectAllClick.bind(this)
      }
    ]
  };

  constructor(public injector: Injector) {
    super(injector);
    this.go = this.injector.get<NavigateService>(NavigateService);
    this.dialog = this.injector.get<DialogService>(DialogService);
    this.dao = new DaoBaseService<Base>("", injector);
  }

  ngOnInit(): void {
    this.BUTTON_ADD.label = this.labelAdd;
  }

  public getId(relativeId?: string) {
    return this.generatedId('_grid_' + this.controlName + this.title + relativeId);
  }

  ngAfterContentInit(): void {
    /* Carrega as configurações feitas via components (tags) */
    this.loadColumns();
    this.loadFilter();
    this.loadReport();
    this.loadToolbar();
    this.loadPagination();
    /* Habilita muiltiselect caso multiselectEnabled esteja presente */
    if(this.isMultiselectEnabled) this.enableMultiselect(true);
  }

  public reset() {
    this.columns = [];
    this.toolbarButtons = [];
    this.selected = undefined;
    this.editing = undefined;
    this.adding = false;
    this.ngAfterContentInit();
  }

  public queryInit() {
    this.query = this.dao?.query(this.queryOptions, { after: () => this.cdRef.detectChanges() });
    this.cdRef.detectChanges();
  }

  public isSeparator(row: any): boolean {
    return row instanceof GridGroupSeparator;
  }

  public getGroupSeparator(row: any): GridGroupSeparator | undefined {
    if(!!this.groupBy && this.groupIds._qtdRows != this.items?.length) this.group(this.items);
    return row instanceof GridGroupSeparator ? row : this.groupIds[row.id];
  }

  public get isMultiselect(): boolean {
    return this.multiselect != undefined;
  }

  public get isMultiselectEnabled(): boolean {
    return this.multiselectEnabled != undefined;
  }

  public get isEditable(): boolean {
    return this.editable != undefined; //|| (this.hasItems && !!this.add);
  }

  /* Utilizado para caso esteja editando irá confirmar a gravação */
  public async confirm() {
    if(this.editing) return await this.saveItem(this.editing);
    return undefined;
  }

  public get hasToolbar(): boolean {
    return !!this.toolbarRef;
  }

  public get hasItems(): boolean {
    return !!this.control || !this.query;
  }

  public get isDisabled(): boolean {
    return this.disabled !== undefined;
  }

  public get queryOptions(): QueryOptions {
    return {
      where: this.filterRef?.where && this.filterRef?.form ? this.filterRef?.where(this.filterRef.form) : [],
      orderBy: [...(this.groupBy || []).map(x => [x.field, "asc"] as QueryOrderBy), ...(this.orderBy || [])],
      join: this.join || [],
      limit: this.rowsLimit
    };
  }

  public group(items: IIndexable[]) {
    if(this.groupBy && items?.length) {
      let buffer = "";
      this.groupIds = { _qtdRows: items.length };
      items = items.filter(x => !(x instanceof GridGroupSeparator)).map(x => Object.assign(x, {_group: this.groupBy!.map(g => Object.assign({}, g, { value: this.util.getNested(x, g.field) }))}));
      if(!this.query) items.sort((a: IIndexable, b: IIndexable) => JSON.stringify(a._group) > JSON.stringify(b._group) ? 1 : JSON.stringify(a._group) < JSON.stringify(b._group) ? -1 : 0);
      for(let i = 0; i < items.length; i++) {
        if(buffer != JSON.stringify(items[i]._group)) {
          buffer = JSON.stringify(items[i]._group);
          this.groupIds[items[i].id] = new GridGroupSeparator(items[i]._group);
          //items.splice(i, 0, new GridGroupSeparator(items[i]._group));
        }
      }
    }
    //return items;
  }

  /*public ungroup(items: IIndexable[]) {
    return items.filter(x => !(x instanceof GridGroupSeparator));
  }*/

  public report() {
    if(this.reportRef) {
      (async () => {
        await this.reportRef!.reportExcel();
      })();
    }
  }

  /*public get multiselectDynamicMenu(): ToolbarButton[] {
    if(this.dynamicMultiselectMenu) {
      const menu = this.dynamicMultiselectMenu(this.multiselected);
      if(JSON.stringify(menu) != JSON.stringify(this._multiselectDynamicMenu)) this._multiselectDynamicMenu = menu;
      return this._multiselectDynamicMenu;
    } else {
      return [];
    }
  }*/

  public refreshMultiselectToolbar() {
    if(this.toolbarRef) this.toolbarRef!.buttons = this.multiselecting ? [this.BUTTON_MULTISELECT, ...(this.multiselectMenu || []), ...(this.dynamicMultiselectMenu ? this.dynamicMultiselectMenu(this.multiselected) : [])] : [...(this.initialButtons || []), ...this.toolbarButtons];
  }

  public enableMultiselect(enable: boolean) {
    this.multiselecting = enable;
    if(this.multiselecting) {
      this.filterCollapsedOnMultiselect = !!this.filterRef?.collapsed;
      if(this.filterRef) this.filterRef.collapsed = true;
      this.BUTTON_MULTISELECT.label = this.BUTTON_MULTISELECT_CANCELAR_SELECAO;
      this.refreshMultiselectToolbar();
      this.BUTTON_MULTISELECT.badge = this.multiselectedCount ? this.multiselectedCount.toString() : undefined;
    } else {
      this.multiselected = {};
      this.BUTTON_MULTISELECT.label = this.BUTTON_MULTISELECT_SELECIONAR;
      if(this.filterRef) this.filterRef.collapsed = this.filterCollapsedOnMultiselect;
      this.refreshMultiselectToolbar();
      this.BUTTON_MULTISELECT.badge = undefined;  
    }
    this.cdRef.detectChanges();
  }

  public onMultiselectClick() {
    this.enableMultiselect(!!this.BUTTON_MULTISELECT.pressed);
  }

  public get multiselectedCount(): number {
    return Object.keys(this.multiselected).length;
  }

  public async onSelectAllClick() {
    this.BUTTON_MULTISELECT.pressed = true;
    if(!this.multiselecting) this.enableMultiselect(true);
    this.dialog.showSppinerOverlay("Obtendo informações de todos os registros . . .");
    try {
      if(this.items && !this.query) {
        this.multiselected = {};
        this.items.forEach(x => this.multiselected[x.id] = x);
      } else if(this.query){
        const result = await this.query.getAllIds(this.multiselectAllFields);
        this.multiselectExtra = result.extra;
        for(let row of result.rows) this.multiselected[row.id] = row;
      }
    } finally {
      this.dialog.closeSppinerOverlay();
    }
    this.BUTTON_MULTISELECT.badge = this.multiselectedCount ? this.multiselectedCount.toString() : undefined;
    this.refreshMultiselectToolbar();
    this.cdRef.detectChanges();
    if(this.multiselectChange) this.multiselectChange(this.multiselected);
  }

  public onUnselectAllClick() {
    this.clearMultiselect();
  }

  public clearMultiselect() {
    this.multiselected = {};
    this.BUTTON_MULTISELECT.badge = undefined;
    this.refreshMultiselectToolbar();
    this.cdRef.detectChanges();
    if(this.multiselectChange) this.multiselectChange(this.multiselected);
  }

  public isMultiselectChecked(row: any) {
    return this.multiselected.hasOwnProperty(row.id) ? "" : undefined;
  }

  public get multiselectedList(): IIndexable[] {
    return Object.values(this.multiselected) || [];    
  }

  public onMultiselectChange(event: any, row: IIndexable) {
    const checked = event.currentTarget.checked;
    if(event.currentTarget.checked) {
      if(!this.multiselected.hasOwnProperty(row.id)) this.multiselected[row.id] = row;
    } else {
      if(this.multiselected.hasOwnProperty(row.id)) delete this.multiselected[row.id];
    }
    this.BUTTON_MULTISELECT.badge = this.multiselectedCount ? this.multiselectedCount.toString() : undefined;
    this.refreshMultiselectToolbar();
    this.cdRef.detectChanges();
    if(this.multiselectChange) this.multiselectChange(this.multiselected);
  }

  public setMultiselectSelectedItems(items: IIndexable[]) {
    items.forEach(row => this.multiselected[row.id] = row);
    this.BUTTON_MULTISELECT.badge = this.multiselectedCount ? this.multiselectedCount.toString() : undefined;
    this.refreshMultiselectToolbar();
    this.cdRef.detectChanges();
  }

  public loadFilter() {
    if(this.filterRef) {
      this.filterRef.grid = this;
      if(!this.filterRef.isHidden) this.toolbarButtons.push(this.BUTTON_FILTER);
    }
  }

  public loadReport() {
    if(this.reportRef) {
      this.reportRef.grid = this;
      if(this.hasReport) this.toolbarButtons.push(this.BUTTON_REPORT);
    }
  }

  public loadToolbar() {
    if(this.toolbarRef && !this.isDisabled) {
      /* Grava os botoes informados diretamente no componente toolbar, pois a propriedade será sobrescrita */
      if(!this.initialButtons) this.initialButtons = this.util.clone(this.toolbarRef.buttons || []);
      /* Insere os botões necessários */
      if(this.isMultiselect) this.toolbarButtons.push(this.BUTTON_MULTISELECT);
      if(this.hasAdd && (this.addRoute || this.add)) this.toolbarButtons.push(this.BUTTON_ADD);
      this.toolbarRef.buttons = [...(this.initialButtons || []), ...this.toolbarButtons];
      this.toolbarRef.icon = this.icon;
      this.toolbarRef.title = this.title;
    }
  }

  public loadPagination() {
    if(this.paginationRef) {
      this.paginationRef.query = this.query;
      this.rowsLimit = this.paginationRef.rows;
    }
  }

  public isEditableGridOptions(column: GridColumn) {
    return column.type == 'options' && (this.isEditable || this.selectable) && this.hasAdd && !this.hasToolbar;
  }

  public get expandedColumn(): GridColumn | undefined {
    return this.columns.find(x => x.isType("expand"));
  }

  public reloadFilter() {
    this.query?.reload(this.queryOptions);
  }

  public showFilter() {
    if(this.filterRef) this.filterRef.collapsed = false;
  }

  public hideFilter() {
    if(this.filterRef) this.filterRef.collapsed = true;
  }

  public loadColumns() {
    this.columns = [];
    this.columnsRef?.columns.forEach(column => {
      const isOptions = column.type == "options";
      if(!isOptions || !this.isDisabled) {
        let buttons = [];
        if(isOptions && this.hasEdit) buttons.push(Object.assign(this.BUTTON_EDIT, { onClick: this.isEditable && !column.onEdit ? this.onEditItem.bind(this) : column.onEdit }));
        if(isOptions && this.hasDelete) buttons.push(Object.assign(this.BUTTON_DELETE, { onClick: this.isEditable && !column.onDelete ? this.onDeleteItem.bind(this) : column.onDelete }));
        this.columns.push(Object.assign(new GridColumn(), column, {
          items: column.items || [],
          buttons: column.type != "options" ? undefined : column.buttons || buttons
        }));
      }
    });
  }

  /*public getColumnClass(column: GridColumn) {
    return "grid-column" + (column.isType('expand') ? " align-bottom" : "");
  }*/

  public onEditItem(row: any) {
    if(!this.editing) {
      this.editing = row; /* Previne multiplas chamadas para inserir */
      (async () => {
        await this.edit(row);
      })();
    }
  }

  public onDeleteItem(row: any) {
    (async () => {
      const remove = this.remove ? !!(await this.remove(row)) : this.hasItems;
      const index = remove ? this.items.findIndex(x => x["id"] == row["id"]) : -1;
      if(index >= 0) this.items.splice(index, 1);
      this.group(this.items);
      this.cdRef.detectChanges();
    })();
  }

  public onAddItem() {
    if(!this.adding) {
      this.adding = true; /* Previne multiplas chamadas para inserir */
      (async () => {
        this.form.reset((this.form as unknown as IFormGroupHelper).initialState);
        let newItem = this.add ? await this.add() : this.form.value;
        if(newItem) {
          if(!(newItem["id"] || "").length && this.hasItems) {
            newItem["id"] = this.dao ? this.dao.generateUuid() : this.util.md5();
          }
          this.items.push(newItem);
          //this.adding = true;
          await this.edit(newItem);
        } else {
          this.adding = false;
        }
      })();
    }
  }

  private async saveItem(itemRow: Base | IIndexable) {
    if(this.form!.valid){
      const entity = this.save ? (await this.save(this.form!, itemRow)) as IIndexable : this.form.value;
      if(entity) {
        const index = this.items.findIndex(x => !(x["id"] || "").length || x["id"] == entity["id"]);
        if(index >= 0) {
          Object.assign(this.items[index], this.util.fillForm(this.items[index], entity));
          this.editing = this.items[index];
        }
      }
      //this.control?.setValue(this.ungroup(this.items));
      this.group(this.items);
      this.control?.setValue(this.items);
      this.cdRef.detectChanges();
      await this.endEdit();
    } else {
      this.form!.markAllAsTouched();
    }
  }

  public onSaveItem(itemRow: Base | IIndexable) {
    (async () => {
      await this.saveItem(itemRow);
    })();
  }

  public onCancelItem() {
    (async () => {
      if(this.adding) this.items.splice(this.items.findIndex(x => !(x instanceof GridGroupSeparator) && x["id"] == (this.editing || [])["id"]), 1);
      await this.endEdit();
    })();
  }

  public getMetadata(row: any): IIndexable {
    if(row.id) {
      if(!this.metadatas[row.id]) this.metadatas[row.id] = {} as IIndexable;
      return this.metadatas[row.id];
    }
    return {};
  }

  public setMetadata(row: any, value: any) {
    if(row.id) this.metadatas[row.id] = value;
  }

  public async edit(itemRow: Base | IIndexable) {
    this.editing = itemRow;
    if(this.load) {
      await this.load(this.form, itemRow);
    } else {
      this.form.patchValue(this.util.fillForm(this.form.value, itemRow));
    }
    this.cdRef.detectChanges();
  }

  public async endEdit() {
    const editedId = this.editing?.id;
    if(this.query && this.editing) await this.query.refreshId(this.editing.id);
    this.editing = undefined;
    this.adding = false;
    this.items = this.items;
    this.cdRef.detectChanges();
    if(this.editEnd) this.editEnd(editedId);
  }

  public onRowClick(event: Event, row: Base | IIndexable) {
    if(this.selectable) {
      this.selected = row;
      this.cdRef.detectChanges();
      if(this.select) this.select.emit(row);
    }
  }

  public selectById(id: string): any {
    let row = this.items.find(x => x.id == id);
    if(this.selectable && row) this.onRowClick(new Event("SelectById"), row);
    return row;
  }

  public isInvalid(): boolean {
    return !!this.control?.invalid && (this.control!.dirty || this.control!.touched);
  }

  public hasError(): boolean {
      return !!this.control?.errors;
  }

  public errorMessage() {
      return this.control!.errors?.errorMessage;
  }
}
