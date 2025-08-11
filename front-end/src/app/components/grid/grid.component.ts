import {
	Component,
	ContentChild,
	EventEmitter,
	HostBinding,
	Injector,
	Input,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
} from "@angular/core";
import {AbstractControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {Observable, Subject, of, takeUntil} from "rxjs";
import {DaoBaseService, QueryOrderBy} from "src/app/dao/dao-base.service";
import {QueryContext} from "src/app/dao/query-context";
import {QueryOptions} from "src/app/dao/query-options";
import {Base, IIndexable} from "src/app/models/base.model";
import {DialogService} from "src/app/services/dialog.service";
import {IFormGroupHelper} from "src/app/services/form-helper.service";
import {
	FullRoute,
	NavigateService,
	RouteMetadata,
} from "src/app/services/navigate.service";
import {ComponentBase} from "../component-base";
import {ToolbarButton, ToolbarComponent} from "../toolbar/toolbar.component";
import {ColumnsComponent} from "./columns/columns.component";
import {FilterComponent} from "./filter/filter.component";
import {GridColumn} from "./grid-column";
import {PaginationComponent} from "./pagination/pagination.component";
import {SidePanelComponent} from "./side-panel/side-panel.component";
import {LookupItem} from "src/app/services/lookup.service";
import {TemplateDaoService} from "src/app/dao/template-dao.service";
import {DocumentoService} from "src/app/modules/uteis/documentos/documento.service";
import { HeaderGroupsComponent } from "./header-groups/header-groups.component";

export type GroupBy = {field: string; label: string; value?: any};
declare var bootstrap: any;
export class GridGroupSeparator {
	constructor(public group: GroupBy[]) {}
	public metadata: any = undefined;
	public get text(): string {
		return this.group.map((x) => x.value).join(" - ");
	}
}

@Component({
	selector: "grid",
	templateUrl: "./grid.component.html",
	styleUrls: ["./grid.component.scss"],
	providers: [
		{
			provide: FormGroupDirective,
			useFactory: (self: GridComponent) => {
				return self.formDirective!;
			},
			deps: [GridComponent],
		},
	],
})
export class GridComponent extends ComponentBase implements OnInit {
	@HostBinding("class") get class(): string {
		return this.isNoMargin ? "p-0 m-0" : "";
	}
	@ContentChild(ColumnsComponent) columnsRef?: ColumnsComponent;
	@ContentChild(FilterComponent) filterRef?: FilterComponent;
	@ContentChild(SidePanelComponent) sidePanel?: SidePanelComponent;
	@ContentChild(ToolbarComponent) toolbarRef?: ToolbarComponent;
	@ContentChild(PaginationComponent) paginationRef?: PaginationComponent;
	@ContentChild(HeaderGroupsComponent) headerGroups?: HeaderGroupsComponent;
	@ViewChild(FormGroupDirective) formDirective?: FormGroupDirective;
	@Output() select = new EventEmitter<Base | IIndexable | null>();
	@Input() dao?: DaoBaseService<Base>;
	@Input() icon: string = "";
	@Input() selectable: boolean = false;
	@Input() loadList?: (rows?: Base[]) => Promise<void> | void;
	@Input() multiselectChange?: (multiselected: IIndexable) => void;
	@Input() init?: (grid: GridComponent) => void;
	@Input() add?: () => Promise<IIndexable | undefined | void>;
	@Input() load?: (form: FormGroup, row: any) => Promise<void>;
	@Input() remove?: (row: any) => Promise<boolean | undefined | void>;
	@Input() save?: (
		form: FormGroup,
		row: any
	) => Promise<IIndexable | Base | boolean | undefined | void>;
	@Input() editEnd?: (id?: string) => void;
	@Input() saveEnd?: (row: any) => void;
	@Input() addRoute?: FullRoute;
	@Input() addMetadata?: RouteMetadata;
	@Input() labelAdd: string = "Incluir";
	@Input() orderBy?: QueryOrderBy[];
	@Input() groupBy?: GroupBy[];
	@Input() join: string[] = [];
	@Input() relatorios: LookupItem[] = [];
	@Input() form: FormGroup = new FormGroup({});
	@Input() noHeader?: string;
	@Input() noMargin?: string;
	@Input() editable?: string;
	@Input() hasReport: boolean = false;
	@Input() scrollable: boolean = false;
	@Input() controlName: string | null = null;
	@Input() control?: AbstractControl = undefined;
	@Input() expanded?: string;
	@Input() noToggleable?: string;
	@Input() minHeight: number = 350;
	@Input() maxHeight: number|string = "auto";
	@Input() multiselect?: string;
	@Input() multiselectEnabled?: string;
	@Input() multiselectAllFields: string[] = [];
	@Input() canSelect?: (row: IIndexable) => boolean;
	@Input() dynamicMultiselectMenu?: (
		multiselected: IIndexable
	) => ToolbarButton[];
	@Input() multiselectMenu?: ToolbarButton[];
	@Input() groupTemplate?: TemplateRef<unknown>;
	@Input() set title(value: string) {
		if (value != this._title) {
			this._title = value;
			if (this.toolbarRef) this.toolbarRef.title = value;
		}
	}
	get title(): string {
		return this._title;
	}
	@Input() set hasAdd(value: boolean) {
		if (value !== this._hasAdd) {
			this._hasAdd = value;
			this.reset();
		}
	}
	get hasAdd(): boolean {
		return this._hasAdd;
	}
	@Input() set hasEdit(value: boolean) {
		if (value !== this._hasEdit) {
			this._hasEdit = value;
			this.reset();
		}
	}
	get hasEdit(): boolean {
		return this._hasEdit;
	}
	@Input() set hasDelete(value: boolean) {
		if (value !== this._hasDelete) {
			this._hasDelete = value;
			this.reset();
		}
	}
	get hasDelete(): boolean {
		return this._hasDelete;
	}
	@Input() set disabled(value: string | undefined) {
		if (value != this._disabled) {
			this._disabled = value;
			this.reset();
		}
	}
	get disabled(): string | undefined {
		return this._disabled;
	}
	@Input() set query(value: QueryContext<Base> | undefined) {
		this._query = value;
		if (this.paginationRef) {
			this.paginationRef.query = value;
			this.paginationRef.cdRef.detectChanges();
		}
		if (value) {
			this.list = value.subject.asObservable();
		}
	}
	get query(): QueryContext<Base> | undefined {
		return this._query;
	}
	@Input() set list(value: Observable<any[]> | undefined) {
		this._list = value;
		if (value)
			value.subscribe(
				async (rows) => {
					if (this.loadList) await this.loadList(rows);
					this.items = rows;
					this.selected = undefined;
					this.cdRef.detectChanges();
				},
				(error) => (this.error = error.message || error.toString())
			);
	}
	get list(): Observable<any[]> | undefined {
		return this._list;
	}
	@Input() set items(value: IIndexable[]) {
		this._items = value;
		if (this.isExpanded) this.expandAll();
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
	@Input() set loading(value: boolean) {
		this._loading = value;
		this.cdRef.detectChanges();
	}
	get loading(): boolean {
		return this._loading;
	}

	@Input() className: string|null = null;

	/* Propriedades private e métodos get e set */
	private _query?: QueryContext<Base>;
	private _list?: Observable<any[]>;
	private _error?: string;
	private _disabled?: string;
	private _loading: boolean = false;
	private _hasAdd: boolean = true;
	private _hasEdit: boolean = true;
	private _hasDelete: boolean = false;
	private _title: string = "";
	private _items?: IIndexable[];
	private _visible: boolean = true;
	private _exporting: boolean = false;
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
	public groupIds: IIndexable = {_qtdRows: -1};
	public expandedIds: IIndexable = {};
	public metadatas: IIndexable = {};
	public templateDao: TemplateDaoService;
	public documentoService: DocumentoService;
	public set error(error: string | undefined) {
		this._error = error;
		//this.detectChanges();
	}
	public get error(): string | undefined {
		return this._error;
	}
	public set exporting(value: boolean) {
		if (value != this._exporting) {
			this._exporting = value;
			value
				? this.dialog.showSppinerOverlay("Exportando dados...")
				: this.dialog.closeSppinerOverlay();
		}
	}
	public get exporting(): boolean {
		return this._exporting;
	}
	public BUTTON_FILTER: ToolbarButton = {
		icon: "bi bi-search",
		label: "Filtros",
		onClick: () => this.filterRef?.toggle(),
	};
	public addToolbarButtonClick = (async () =>
		await (this.add
			? this.isEditable && this.hasToolbar
				? this.onAddItem()
				: this.add()
			: this.go.navigate(this.addRoute!, this.addMetadata))).bind(this);
	public BUTTON_ADD: ToolbarButton = {
		icon: "bi bi-plus-circle",
		color: "btn-outline-success",
		label: this.labelAdd,
		onClick: this.addToolbarButtonClick,
	};
	public BUTTON_EDIT: ToolbarButton = {
		label: "Alterar",
		icon: "bi bi-pencil-square",
		hint: "Alterar",
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
				onClick: this.onSelectAllClick.bind(this),
			},
			{
				label: "Nenhum",
				icon: "bi bi-grid",
				hint: "Selecionar",
				color: "btn-outline-danger",
				onClick: this.onUnselectAllClick.bind(this),
			},
		],
	};
	
	public panelButtons: ToolbarButton[] = [
		{
			id: "concluir_valid",
			label: "Concluir",
			icon: "bi-check-circle",
			color: "btn-outline-success",
			dynamicVisible: (() => this.form!.valid).bind(this),
			onClick: (() => this.onSaveItem(this.editing!)).bind(this),
		},
		{
			id: "concluir_invalid",
			label: "Concluir",
			icon: "bi-exclamation-circle",
			color: "btn-outline-success",
			dynamicVisible: (() => !this.form!.valid).bind(this),
			onClick: (() => console.log(this.form.errors)).bind(this),
		},
		{
			id: "cancelar",
			label: "Cancelar",
			icon: "bi-dash-circle",
			color: "btn-outline-danger",
			onClick: this.onCancelItem.bind(this),
		},
	];

	constructor(public injector: Injector) {
		super(injector);
		this.go = this.injector.get<NavigateService>(NavigateService);
		this.dialog = this.injector.get<DialogService>(DialogService);
		this.dao = new DaoBaseService<Base>("", injector);
		this.templateDao =
			this.injector.get<TemplateDaoService>(TemplateDaoService);
		this.documentoService =
			this.injector.get<DocumentoService>(DocumentoService);
	
	}

	ngOnInit(): void {
		this.BUTTON_ADD.label = this.labelAdd;
		
	}

	public getId(relativeId?: string) {
		return this.generatedId(
			"_grid_" + this.controlName + this.title + relativeId
		);
	}

	ngAfterContentInit(): void {
		/* Carrega as configurações feitas via components (tags) */
		this.loadColumns();
		this.loadFilter();
		this.loadToolbar();
		this.loadPagination();

		/* Habilita muiltiselect caso multiselectEnabled esteja presente */
		if (this.isMultiselectEnabled) this.enableMultiselect(true);
	}

	ngAfterViewInit(): void {
		if (this.init) this.init(this);
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
		this.query = this.dao?.query(this.queryOptions, {
			after: () => {
				this.cdRef.detectChanges();
					setTimeout(() => {
						const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
						const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
					}, 300);
			},
		});
		this.cdRef.detectChanges();
	}

	public isSeparator(row: any): boolean {
		return row instanceof GridGroupSeparator;
	}

	public get isExpanded(): boolean {
		return this.expanded != undefined;
	}

	public get isNoHeader(): boolean {
		return this.noHeader != undefined;
	}

	public get isNoToggleable(): boolean {
		return this.noToggleable != undefined;
	}

	public get isNoMargin(): boolean {
		return this.noMargin != undefined;
	}

	public get isLoading(): boolean {
		return this.query?.loading || this.loading;
	}

	public getGroupSeparator(row: any): GridGroupSeparator | undefined {
		if (!!this.groupBy && this.groupIds._qtdRows != this.items?.length)
			this.group(this.items);
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

	public get isSelectable(): boolean {
		/* Considera o sidePanel */
		return this.selectable || !!this.sidePanel;
	}

	/* Utilizado para caso esteja editando irá confirmar a gravação */
	public async confirm() {
		if (this.editing) return await this.saveItem(this.editing);
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
			where:
				this.filterRef?.where && this.filterRef?.form
					? this.filterRef?.where(this.filterRef.form)
					: [],
			orderBy: [
				...(this.groupBy || []).map((x) => [x.field, "asc"] as QueryOrderBy),
				...(this.orderBy || []),
			],
			join: this.join || [],
			limit: this.rowsLimit,
		};
	}

	public group(items: IIndexable[]) {
		if (this.groupBy && items?.length) {
			let buffer = "";
			this.groupIds = {_qtdRows: items.length};
			let mapItems = items
				.filter((x) => !(x instanceof GridGroupSeparator))
				.map((x) =>
					Object.assign(x, {
						_group: this.groupBy!.map((g) =>
							Object.assign({}, g, {value: this.util.getNested(x, g.field)})
						),
					})
				);
			//items = items.filter(x => !(x instanceof GridGroupSeparator)).map(x => Object.assign(x, {_group: this.groupBy!.map(g => Object.assign({}, g, { value: this.util.getNested(x, g.field) }))}));
			items.splice(0, items.length, ...mapItems);
			if (!this.query)
				items.sort((a: IIndexable, b: IIndexable) =>
					JSON.stringify(a._group) > JSON.stringify(b._group)
						? 1
						: JSON.stringify(a._group) < JSON.stringify(b._group)
						? -1
						: 0
				);
			for (let i = 0; i < items.length; i++) {
				if (buffer != JSON.stringify(items[i]._group)) {
					buffer = JSON.stringify(items[i]._group);
					this.groupIds[items[i].id] = new GridGroupSeparator(items[i]._group);
				}
			}
		}
	}

	

	public expand(id: string) {
		this.expandedIds[id] = true;
		this.cdRef.detectChanges();
	}

	public expandAll() {
		this.items.forEach((v) => (this.expandedIds[v.id] = true));
	}

	public refreshExpanded(id: string) {
		let expanded = this.expandedIds[id];
		this.expandedIds[id] = false;
		this.cdRef.detectChanges();
		this.expandedIds[id] = expanded;
		this.cdRef.detectChanges();
	}

	public refreshRows() {
		let items = this._items;
		this._items = [];
		this.cdRef.detectChanges();
		this._items = items;
		this.cdRef.detectChanges();
	}

	public refreshMultiselectToolbar() {
		if (this.toolbarRef)
			this.toolbarRef!.buttons = this.multiselecting
				? [
						this.BUTTON_MULTISELECT,
						...(this.multiselectMenu || []),
						...(this.dynamicMultiselectMenu
							? this.dynamicMultiselectMenu(this.multiselected)
							: []),
				  ]
				: [...(this.initialButtons || []), ...this.toolbarButtons];
	}

	public enableMultiselect(enable: boolean) {
		this.multiselecting = enable;
		if (this.multiselecting) {
			this.filterCollapsedOnMultiselect = !!this.filterRef?.collapsed;
			if (this.filterRef) this.filterRef.collapsed = true;
			this.BUTTON_MULTISELECT.label = this.BUTTON_MULTISELECT_CANCELAR_SELECAO;
			this.refreshMultiselectToolbar();
			this.BUTTON_MULTISELECT.badge = this.multiselectedCount
				? this.multiselectedCount.toString()
				: undefined;
		} else {
			this.multiselected = {};
			this.BUTTON_MULTISELECT.label = this.BUTTON_MULTISELECT_SELECIONAR;
			if (this.filterRef)
				this.filterRef.collapsed = this.filterCollapsedOnMultiselect;
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
		if (!this.multiselecting) this.enableMultiselect(true);
		this.dialog.showSppinerOverlay(
			"Obtendo informações de todos os registros . . ."
		);
		try {
			if (this.items && !this.query) {
				this.multiselected = {};
				this.items.forEach((x) => (this.multiselected[x.id] = x));
			} else if (this.query) {
				console.log(this.multiselectAllFields);
				const result = await this.query.getAllIds(this.multiselectAllFields);
				this.multiselectExtra = result.extra;
				for (let row of result.rows) this.multiselected[row.id] = row;
			}
		} finally {
			this.dialog.closeSppinerOverlay();
		}
		this.BUTTON_MULTISELECT.badge = this.multiselectedCount
			? this.multiselectedCount.toString()
			: undefined;
		this.refreshMultiselectToolbar();
		this.cdRef.detectChanges();
		if (this.multiselectChange) this.multiselectChange(this.multiselected);
	}

	public onUnselectAllClick() {
		this.clearMultiselect();
	}

	public clearMultiselect() {
		this.multiselected = {};
		this.BUTTON_MULTISELECT.badge = undefined;
		this.refreshMultiselectToolbar();
		this.cdRef.detectChanges();
		if (this.multiselectChange) this.multiselectChange(this.multiselected);
	}

	public isMultiselectChecked(row: any) {
		return this.multiselected.hasOwnProperty(row.id) ? "" : undefined;
	}

	public get multiselectedList(): IIndexable[] {
		return Object.values(this.multiselected) || [];
	}

	public onMultiselectChange(event: any, row: IIndexable) {
		const checked = event.currentTarget.checked;
		if (event.currentTarget.checked) {
			if (!this.multiselected.hasOwnProperty(row.id))
				this.multiselected[row.id] = row;
		} else {
			if (this.multiselected.hasOwnProperty(row.id))
				delete this.multiselected[row.id];
		}
		this.BUTTON_MULTISELECT.badge = this.multiselectedCount
			? this.multiselectedCount.toString()
			: undefined;
		this.refreshMultiselectToolbar();
		this.cdRef.detectChanges();
		if (this.multiselectChange) this.multiselectChange(this.multiselected);
	}

	public setMultiselectSelectedItems(items: IIndexable[]) {
		items.forEach((row) => (this.multiselected[row.id] = row));
		this.BUTTON_MULTISELECT.badge = this.multiselectedCount
			? this.multiselectedCount.toString()
			: undefined;
		this.refreshMultiselectToolbar();
		this.cdRef.detectChanges();
	}

	public loadFilter() {
		if (this.filterRef) {
			this.filterRef.grid = this;
			// if (!this.filterRef.isHidden)
			//	this.toolbarButtons.push(this.BUTTON_FILTER);
		}
	}



	public loadToolbar() {
		if (this.toolbarRef && !this.isDisabled) {
			/* Grava os botoes informados diretamente no componente toolbar, pois a propriedade será sobrescrita */
			if (!this.initialButtons)
				this.initialButtons = [...(this.toolbarRef.buttons || [])]; //this.util.clone(this.toolbarRef.buttons || []);
			/* Insere os botões necessários */
			if (this.isMultiselect) this.toolbarButtons.push(this.BUTTON_MULTISELECT);
			if (this.hasAdd && (this.addRoute || this.add))
				this.toolbarButtons.push(this.BUTTON_ADD);
			this.toolbarRef.buttons = [
				...(this.initialButtons || []),
				...this.toolbarButtons,
			];
			this.toolbarRef.icon = this.icon;
			this.toolbarRef.title = this.title;
		}
	}

	public loadPagination() {
		if (this.paginationRef) {
			this.paginationRef.query = this.query;
			this.rowsLimit = this.paginationRef.rows;
		}
	}

	public isEditableGridOptions(column: GridColumn) {
		return (
			column.type == "options" &&
			(this.isEditable || this.isSelectable) &&
			this.hasAdd &&
			!this.hasToolbar
		);
	}

	public get expandedColumn(): GridColumn | undefined {
		return this.columns.find((x) => x.isType("expand"));
	}

	public reloadFilter() {
		this.query?.reload(this.queryOptions);
	}

	public showFilter() {
		if (this.filterRef) this.filterRef.collapsed = false;
	}

	public hideFilter() {
		if (this.filterRef) this.filterRef.collapsed = true;
	}

	public loadColumns() {
		this.columns = [];
		this.columnsRef?.columns.forEach((column) => {
			const isOptions = column.type == "options";
			if (!isOptions || !this.isDisabled) {
				let buttons = [];
				if (isOptions && this.hasEdit)
					buttons.push(
						Object.assign(this.BUTTON_EDIT, {
							onClick:
								this.isEditable && !column.onEdit
									? this.onEditItem.bind(this)
									: column.onEdit,
						})
					);
				if (isOptions && this.hasDelete)
					buttons.push(
						Object.assign(this.BUTTON_DELETE, {
							onClick:
								this.isEditable && !column.onDelete
									? this.onDeleteItem.bind(this)
									: column.onDelete,
						})
					);
				this.columns.push(
					Object.assign(new GridColumn(), column, {
						items: column.items || [],
						buttons:
							column.type != "options" ? undefined : column.buttons || buttons,
					})
				);
			}
		});
	}

	/**
	 * Método chamado para incluir um item no grid.
	 */
	public onAddItem() {
		if (!this.adding) {
			this.adding = true; /* Previne multiplas chamadas para inserir */
			(async () => {
				this.form.reset(
					(this.form as unknown as IFormGroupHelper).initialState
				);
				let newItem = this.add ? await this.add() : this.form.value;
				if (newItem) {
					if (!(newItem["id"] || "").length && this.hasItems) {
						newItem["id"] = this.dao
							? this.dao.generateUuid()
							: this.util.md5();
					}
					this.items.push(newItem);
					await this.edit(newItem);
				} else {
					this.adding = false;
				}
			}).bind(this)();
		}
	}

	/**
	 * Método chamado durante a edição ou inclusão de um item no grid.
	 */
	public onEditItem(row: any) {
		if (!this.editing) {
			this.editing = row; /* Previne multiplas chamadas para inserir */
			(async () => {
				await this.edit(row);
			}).bind(this)();
		}
	}

	/**
	 * Método chamado durante a exclusão de um item do grid.
	 * @param row
	 */
	public onDeleteItem(row: any) {
		(async () => {
			const remove = this.remove ? !!(await this.remove(row)) : this.hasItems;
			const index = remove
				? this.items.findIndex((x) => x["id"] == row["id"])
				: -1;
			if (index >= 0) this.items.splice(index, 1);
			this.group(this.items);
			this.selected = undefined;
			this.cdRef.detectChanges();
		}).bind(this)();
	}

	public onCancelItem() {
		(async () => {
			if (this.adding)
				this.items.splice(
					this.items.findIndex(
						(x) =>
							!(x instanceof GridGroupSeparator) &&
							x["id"] == (this.editing || {id: undefined})["id"]
					),
					1
				);
			await this.endEdit();
		}).bind(this)();
	}

	/**
	 * Método chamado no salvamento de um item em um grid editável.
	 * @param itemRow
	 */
	public onSaveItem(itemRow: Base | IIndexable) {
		(async () => {
			await this.saveItem(itemRow);
		}).bind(this)();
	}

	/**
	 * Método chamado pelo onSaveItem para o salvamento de um item de um grid editável.
	 * @param itemRow
	 */
	private async saveItem(itemRow: Base | IIndexable) {
		if (this.form!.valid) {
			const entity = this.save
				? ((await this.save(this.form!, itemRow)) as IIndexable)
				: this.form.value;
			if (entity) {
				const index =
					(this.items.indexOf(itemRow) + 1 ||
						this.items.findIndex(
							(x) => !(x["id"] || "").length || x["id"] == entity["id"]
						) + 1) - 1;
				let item: IIndexable | undefined = undefined;
				if (index >= 0) {
					item = this.items[index];
					Object.assign(this.items[index], this.util.fillForm(item, entity));
				} else if (entity["id"]?.length) {
					item = entity;
					this.items.push(entity);
				}
				this.editing = item;
				if (this.saveEnd) this.saveEnd(item);
			}
			if (entity !== false) {
				this.group(this.items);
				this.control?.setValue(this.items);
				this.cdRef.detectChanges();
				await this.endEdit();
			}
		} else {
			this.form!.markAllAsTouched();
		}
	}

	public async edit(itemRow: Base | IIndexable) {
		if (this.isSelectable && itemRow)
			this.onRowClick(new Event("SelectByEdit"), itemRow);
		this.editing = itemRow;
		if (this.filterRef) this.filterRef.visible = false;
		if (this.toolbarRef) this.toolbarRef.visible = false;
		if (this.load) {
			await this.load(this.form, itemRow);
		} else {
			this.form.patchValue(this.util.fillForm(this.form.value, itemRow));
		}
		this.cdRef.detectChanges();
		(
			document.getElementById("row_" + itemRow.id) as HTMLTableRowElement
		)?.scrollIntoView({block: "end", inline: "nearest", behavior: "smooth"});
	}

	public async endEdit() {
		const editedId = this.editing?.id;
		if (this.query && this.editing) await this.query.refreshId(this.editing.id);
		this.editing = undefined;
		this.adding = false;
		this.items = this.items;
		if (this.filterRef) this.filterRef.visible = true;
		if (this.toolbarRef) this.toolbarRef.visible = true;
		this.cdRef.detectChanges();
		if (this.isSelectable)
			this.onRowClick(
				new Event("SelectByEdit"),
				this.items.find((x) => x.id == editedId)!
			);
		if (this.editEnd) this.editEnd(editedId);
	}

	public onRowClick(event: Event, row: Base | IIndexable) {
		if (this.isSelectable) {
			if (this.editing != row) this.onCancelItem();
			this.selected = row;
			this.cdRef.detectChanges();
			if (this.select) this.select.emit(row);
		}
	}

	public selectById(id: string): any {
		let row = this.items.find((x) => x.id == id);
		if (this.isSelectable && row) this.onRowClick(new Event("SelectById"), row);
		return row;
	}

	public getMetadata(row: any): IIndexable {
		if (row?.id) {
			if (!this.metadatas[row.id]) this.metadatas[row.id] = {} as IIndexable;
			return this.metadatas[row.id];
		}
		return {};
	}

	public setMetadata(row: any, value: any) {
		if (row.id) this.metadatas[row.id] = value;
	}

	public clearMetadata() {
		this.metadatas = {};
		this.cdRef.detectChanges();
	}

	/* Side panel ****************************************************************/
	public get classColTable(): string {
		return (
			(this.sidePanel
				? "col-md-" +
				  (12 - this.sidePanel.size) +
				  (this.sidePanel.isFullSizeOnEdit && this.editing ? " d-none" : "")
				: "col-md-12") + (this.isNoMargin ? " p-0 m-0" : "")
		);
	}

	public get classColPanel(): string {
		return (
			"col-md-" +
			(this.sidePanel!.isFullSizeOnEdit && this.editing
				? 12
				: this.sidePanel!.size)
		);
	}
	/**************************************************************** Side panel */

	public isInvalid(): boolean {
		return (
			!!this.control?.invalid && (this.control!.dirty || this.control!.touched)
		);
	}

	public hasError(): boolean {
		return !!this.control?.errors;
	}

	public errorMessage() {
		return this.control!.errors?.errorMessage;
	}

	
}
