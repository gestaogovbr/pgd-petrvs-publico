import { __decorate } from "tslib";
import { Component, ContentChild, EventEmitter, HostBinding, Input, Output, ViewChild, } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { DaoBaseService } from "src/app/dao/dao-base.service";
import { DialogService } from "src/app/services/dialog.service";
import { NavigateService, } from "src/app/services/navigate.service";
import { ComponentBase } from "../component-base";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { ColumnsComponent } from "./columns/columns.component";
import { FilterComponent } from "./filter/filter.component";
import { GridColumn } from "./grid-column";
import { PaginationComponent } from "./pagination/pagination.component";
import { SidePanelComponent } from "./side-panel/side-panel.component";
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { DocumentoService } from "src/app/modules/uteis/documentos/documento.service";
import { HeaderGroupsComponent } from "./header-groups/header-groups.component";
import { GridGroupSeparator } from "./grid-types";
let GridComponent = class GridComponent extends ComponentBase {
    get class() {
        return this.isNoMargin ? "p-0 m-0" : "";
    }
    set title(value) {
        if (value != this._title) {
            this._title = value;
            if (this.toolbarRef)
                this.toolbarRef.title = value;
        }
    }
    get title() {
        return this._title;
    }
    set hasAdd(value) {
        if (value !== this._hasAdd) {
            this._hasAdd = value;
            this.reset();
        }
    }
    get hasAdd() {
        return this._hasAdd;
    }
    set hasEdit(value) {
        if (value !== this._hasEdit) {
            this._hasEdit = value;
            this.reset();
        }
    }
    get hasEdit() {
        return this._hasEdit;
    }
    set hasDelete(value) {
        if (value !== this._hasDelete) {
            this._hasDelete = value;
            this.reset();
        }
    }
    get hasDelete() {
        return this._hasDelete;
    }
    set disabled(value) {
        if (value != this._disabled) {
            this._disabled = value;
            this.reset();
        }
    }
    get disabled() {
        return this._disabled;
    }
    set query(value) {
        this._query = value;
        if (this.paginationRef) {
            this.paginationRef.query = value;
            this.paginationRef.cdRef.detectChanges();
        }
        if (value) {
            this.list = value.subject.asObservable();
        }
    }
    get query() {
        return this._query;
    }
    set list(value) {
        this._list = value;
        if (value)
            value.subscribe(async (rows) => {
                if (this.loadList)
                    await this.loadList(rows);
                this.items = rows;
                this.selected = undefined;
                this.cdRef.detectChanges();
            }, (error) => (this.error = error.message || error.toString()));
    }
    get list() {
        return this._list;
    }
    set items(value) {
        this._items = value;
        if (this.isExpanded)
            this.expandAll();
        this.group(value);
        this.control?.setValue(value);
        this.cdRef.detectChanges();
    }
    get items() {
        return this.control?.value || this._items || [];
    }
    set visible(value) {
        this._visible = value;
        this.cdRef.detectChanges();
    }
    get visible() {
        return this._visible;
    }
    set loading(value) {
        this._loading = value;
        this.cdRef.detectChanges();
    }
    get loading() {
        return this._loading;
    }
    set error(error) {
        this._error = error;
        //this.detectChanges();
    }
    get error() {
        return this._error;
    }
    set exporting(value) {
        if (value != this._exporting) {
            this._exporting = value;
            value
                ? this.dialog.showSppinerOverlay("Exportando dados...")
                : this.dialog.closeSppinerOverlay();
        }
    }
    get exporting() {
        return this._exporting;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.select = new EventEmitter();
        this.icon = "";
        this.selectable = false;
        this.labelAdd = "Incluir";
        this.join = [];
        this.relatorios = [];
        this.form = new FormGroup({});
        this.hasReport = false;
        this.scrollable = false;
        this.controlName = null;
        this.control = undefined;
        this.minHeight = 350;
        this.maxHeight = "auto";
        this.multiselectAllFields = [];
        this.className = null;
        this._loading = false;
        this._hasAdd = true;
        this._hasEdit = true;
        this._hasDelete = false;
        this._title = "";
        this._visible = true;
        this._exporting = false;
        this.filterCollapsedOnMultiselect = false;
        /* Propriedades publicas */
        this.self = this;
        this.columns = [];
        this.toolbarButtons = [];
        this.adding = false;
        this.multiselecting = false;
        this.multiselected = {};
        this.multiselectExtra = undefined;
        this.groupIds = { _qtdRows: -1 };
        this.expandedIds = {};
        this.metadatas = {};
        this.BUTTON_FILTER = {
            icon: "bi bi-search",
            label: "Filtros",
            onClick: () => this.filterRef?.toggle(),
        };
        this.addToolbarButtonClick = (async () => await (this.add
            ? this.isEditable && this.hasToolbar
                ? this.onAddItem()
                : this.add()
            : this.go.navigate(this.addRoute, this.addMetadata))).bind(this);
        this.BUTTON_ADD = {
            icon: "bi bi-plus-circle",
            color: "btn-outline-success",
            label: this.labelAdd,
            onClick: this.addToolbarButtonClick,
        };
        this.BUTTON_EDIT = {
            label: "Alterar",
            icon: "bi bi-pencil-square",
            hint: "Alterar",
            color: "btn-outline-info",
        };
        this.BUTTON_DELETE = {
            label: "Excluir",
            icon: "bi bi-trash",
            hint: "Excluir",
            color: "btn-outline-danger",
        };
        this.BUTTON_MULTISELECT_SELECIONAR = "Selecionar";
        this.BUTTON_MULTISELECT_CANCELAR_SELECAO = "Cancelar seleção";
        this.BUTTON_MULTISELECT = {
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
        this.panelButtons = [
            {
                id: "concluir_valid",
                label: "Concluir",
                icon: "bi-check-circle",
                color: "btn-outline-success",
                dynamicVisible: (() => this.form.valid).bind(this),
                onClick: (() => this.onSaveItem(this.editing)).bind(this),
            },
            {
                id: "concluir_invalid",
                label: "Concluir",
                icon: "bi-exclamation-circle",
                color: "btn-outline-success",
                dynamicVisible: (() => !this.form.valid).bind(this),
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
        this.go = this.injector.get(NavigateService);
        this.dialog = this.injector.get(DialogService);
        this.dao = new DaoBaseService("", injector);
        this.templateDao =
            this.injector.get(TemplateDaoService);
        this.documentoService =
            this.injector.get(DocumentoService);
    }
    ngOnInit() {
        this.BUTTON_ADD.label = this.labelAdd;
    }
    getId(relativeId) {
        return this.generatedId("_grid_" + this.controlName + this.title + relativeId);
    }
    ngAfterContentInit() {
        /* Carrega as configurações feitas via components (tags) */
        this.loadColumns();
        this.loadFilter();
        this.loadToolbar();
        this.loadPagination();
        /* Habilita muiltiselect caso multiselectEnabled esteja presente */
        if (this.isMultiselectEnabled)
            this.enableMultiselect(true);
    }
    ngAfterViewInit() {
        if (this.init)
            this.init(this);
    }
    reset() {
        this.columns = [];
        this.toolbarButtons = [];
        this.selected = undefined;
        this.editing = undefined;
        this.adding = false;
        this.ngAfterContentInit();
    }
    queryInit(events = {}) {
        this.query = this.dao?.query(this.queryOptions, {
            before: events.before,
            resolve: events.resolve,
            after: () => {
                events.after && events.after();
                this.cdRef.detectChanges();
                setTimeout(() => {
                    // Dispose existing tooltips to prevent duplicates
                    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
                        const instance = bootstrap.Tooltip.getInstance(el);
                        if (instance)
                            instance.dispose();
                    });
                    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
                    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => {
                        const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                            trigger: 'manual'
                        });
                        tooltipTriggerEl.addEventListener('mouseenter', () => tooltip.show());
                        tooltipTriggerEl.addEventListener('mouseleave', () => tooltip.hide());
                        tooltipTriggerEl.addEventListener('click', () => tooltip.hide());
                        return tooltip;
                    });
                }, 300);
            },
        });
        this.cdRef.detectChanges();
    }
    isSeparator(row) {
        return row instanceof GridGroupSeparator;
    }
    get isExpanded() {
        return this.expanded != undefined;
    }
    get isNoHeader() {
        return this.noHeader != undefined;
    }
    get isNoToggleable() {
        return this.noToggleable != undefined;
    }
    get isNoMargin() {
        return this.noMargin != undefined;
    }
    get isLoading() {
        return this.query?.loading || this.loading;
    }
    getGroupSeparator(row) {
        if (!!this.groupBy && this.groupIds._qtdRows != this.items?.length)
            this.group(this.items);
        return row instanceof GridGroupSeparator ? row : this.groupIds[row.id];
    }
    get isMultiselect() {
        return this.multiselect != undefined;
    }
    get isMultiselectEnabled() {
        return this.multiselectEnabled != undefined;
    }
    get isEditable() {
        return this.editable != undefined; //|| (this.hasItems && !!this.add);
    }
    get isSelectable() {
        /* Considera o sidePanel */
        return this.selectable || !!this.sidePanel;
    }
    /* Utilizado para caso esteja editando irá confirmar a gravação */
    async confirm() {
        if (this.editing)
            return await this.saveItem(this.editing);
        return undefined;
    }
    get hasToolbar() {
        return !!this.toolbarRef;
    }
    get hasItems() {
        return !!this.control || !this.query;
    }
    get isDisabled() {
        return this.disabled !== undefined;
    }
    get queryOptions() {
        return {
            where: this.filterRef?.where && this.filterRef?.form
                ? this.filterRef?.where(this.filterRef.form)
                : [],
            orderBy: [
                ...(this.priorOrderBy || []),
                ...(this.groupBy || []).map((x) => [x.field, "asc"]),
                ...(this.orderBy || []),
            ],
            join: this.join || [],
            limit: this.rowsLimit,
            leftJoin: this.leftJoin,
            fields: this.fields
        };
    }
    group(items) {
        if (this.groupBy && items?.length) {
            let buffer = "";
            this.groupIds = { _qtdRows: items.length };
            let mapItems = items
                .filter((x) => !(x instanceof GridGroupSeparator))
                .map((x) => Object.assign(x, {
                _group: this.groupBy.map((g) => Object.assign({}, g, { value: this.util.getNested(x, g.field) })),
            }));
            //items = items.filter(x => !(x instanceof GridGroupSeparator)).map(x => Object.assign(x, {_group: this.groupBy!.map(g => Object.assign({}, g, { value: this.util.getNested(x, g.field) }))}));
            items.splice(0, items.length, ...mapItems);
            if (!this.query)
                items.sort((a, b) => JSON.stringify(a._group) > JSON.stringify(b._group)
                    ? 1
                    : JSON.stringify(a._group) < JSON.stringify(b._group)
                        ? -1
                        : 0);
            for (let i = 0; i < items.length; i++) {
                if (buffer != JSON.stringify(items[i]._group)) {
                    buffer = JSON.stringify(items[i]._group);
                    this.groupIds[items[i].id] = new GridGroupSeparator(items[i]._group);
                }
            }
        }
    }
    expand(id) {
        this.expandedIds[id] = true;
        this.cdRef.detectChanges();
    }
    expandAll() {
        this.items.forEach((v) => (this.expandedIds[v.id] = true));
    }
    refreshExpanded(id) {
        let expanded = this.expandedIds[id];
        this.expandedIds[id] = false;
        this.cdRef.detectChanges();
        this.expandedIds[id] = expanded;
        this.cdRef.detectChanges();
    }
    refreshRows() {
        let items = this._items;
        this._items = [];
        this.cdRef.detectChanges();
        this._items = items;
        this.cdRef.detectChanges();
    }
    refreshMultiselectToolbar() {
        if (this.toolbarRef)
            this.toolbarRef.buttons = this.multiselecting
                ? [
                    this.BUTTON_MULTISELECT,
                    ...(this.multiselectMenu || []),
                    ...(this.dynamicMultiselectMenu
                        ? this.dynamicMultiselectMenu(this.multiselected)
                        : []),
                ]
                : [...(this.initialButtons || []), ...this.toolbarButtons];
    }
    enableMultiselect(enable) {
        this.multiselecting = enable;
        if (this.multiselecting) {
            this.filterCollapsedOnMultiselect = !!this.filterRef?.collapsed;
            if (this.filterRef)
                this.filterRef.collapsed = true;
            this.BUTTON_MULTISELECT.label = this.BUTTON_MULTISELECT_CANCELAR_SELECAO;
            this.refreshMultiselectToolbar();
            this.BUTTON_MULTISELECT.badge = this.multiselectedCount
                ? this.multiselectedCount.toString()
                : undefined;
        }
        else {
            this.multiselected = {};
            this.BUTTON_MULTISELECT.label = this.BUTTON_MULTISELECT_SELECIONAR;
            if (this.filterRef)
                this.filterRef.collapsed = this.filterCollapsedOnMultiselect;
            this.refreshMultiselectToolbar();
            this.BUTTON_MULTISELECT.badge = undefined;
        }
        this.cdRef.detectChanges();
    }
    onMultiselectClick() {
        this.enableMultiselect(!!this.BUTTON_MULTISELECT.pressed);
    }
    get multiselectedCount() {
        return Object.keys(this.multiselected).length;
    }
    async onSelectAllClick() {
        this.BUTTON_MULTISELECT.pressed = true;
        if (!this.multiselecting)
            this.enableMultiselect(true);
        this.dialog.showSppinerOverlay("Obtendo informações de todos os registros . . .");
        try {
            if (this.items && !this.query) {
                this.multiselected = {};
                this.items.forEach((x) => (this.multiselected[x.id] = x));
            }
            else if (this.query) {
                console.log(this.multiselectAllFields);
                const result = await this.query.getAllIds(this.multiselectAllFields);
                this.multiselectExtra = result.extra;
                for (let row of result.rows)
                    this.multiselected[row.id] = row;
            }
        }
        finally {
            this.dialog.closeSppinerOverlay();
        }
        this.BUTTON_MULTISELECT.badge = this.multiselectedCount
            ? this.multiselectedCount.toString()
            : undefined;
        this.refreshMultiselectToolbar();
        this.cdRef.detectChanges();
        if (this.multiselectChange)
            this.multiselectChange(this.multiselected);
    }
    onUnselectAllClick() {
        this.clearMultiselect();
    }
    clearMultiselect() {
        this.multiselected = {};
        this.BUTTON_MULTISELECT.badge = undefined;
        this.refreshMultiselectToolbar();
        this.cdRef.detectChanges();
        if (this.multiselectChange)
            this.multiselectChange(this.multiselected);
    }
    isMultiselectChecked(row) {
        return this.multiselected.hasOwnProperty(row.id) ? "" : undefined;
    }
    get multiselectedList() {
        return Object.values(this.multiselected) || [];
    }
    onMultiselectChange(event, row) {
        const checked = event.currentTarget.checked;
        if (event.currentTarget.checked) {
            if (!this.multiselected.hasOwnProperty(row.id))
                this.multiselected[row.id] = row;
        }
        else {
            if (this.multiselected.hasOwnProperty(row.id))
                delete this.multiselected[row.id];
        }
        this.BUTTON_MULTISELECT.badge = this.multiselectedCount
            ? this.multiselectedCount.toString()
            : undefined;
        this.refreshMultiselectToolbar();
        this.cdRef.detectChanges();
        if (this.multiselectChange)
            this.multiselectChange(this.multiselected);
    }
    setMultiselectSelectedItems(items) {
        items.forEach((row) => (this.multiselected[row.id] = row));
        this.BUTTON_MULTISELECT.badge = this.multiselectedCount
            ? this.multiselectedCount.toString()
            : undefined;
        this.refreshMultiselectToolbar();
        this.cdRef.detectChanges();
    }
    loadFilter() {
        if (this.filterRef) {
            this.filterRef.grid = this;
            // if (!this.filterRef.isHidden)
            //	this.toolbarButtons.push(this.BUTTON_FILTER);
        }
    }
    loadToolbar() {
        if (this.toolbarRef && !this.isDisabled) {
            /* Grava os botoes informados diretamente no componente toolbar, pois a propriedade será sobrescrita */
            if (!this.initialButtons)
                this.initialButtons = [...(this.toolbarRef.buttons || [])]; //this.util.clone(this.toolbarRef.buttons || []);
            /* Insere os botões necessários */
            if (this.isMultiselect)
                this.toolbarButtons.push(this.BUTTON_MULTISELECT);
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
    loadPagination() {
        if (this.paginationRef) {
            this.paginationRef.query = this.query;
            this.rowsLimit = this.paginationRef.rows;
        }
    }
    isEditableGridOptions(column) {
        return (column.type == "options" &&
            (this.isEditable || this.isSelectable) &&
            this.hasAdd &&
            !this.hasToolbar);
    }
    get expandedColumn() {
        return this.columns.find((x) => x.isType("expand"));
    }
    reloadFilter() {
        this.query?.reload(this.queryOptions);
    }
    showFilter() {
        if (this.filterRef)
            this.filterRef.collapsed = false;
    }
    hideFilter() {
        if (this.filterRef)
            this.filterRef.collapsed = true;
    }
    loadColumns() {
        this.columns = [];
        this.columnsRef?.columns.forEach((column) => {
            const isOptions = column.type == "options";
            if (!isOptions || !this.isDisabled) {
                let buttons = [];
                if (isOptions && this.hasEdit)
                    buttons.push(Object.assign(this.BUTTON_EDIT, {
                        onClick: this.isEditable && !column.onEdit
                            ? this.onEditItem.bind(this)
                            : column.onEdit,
                    }));
                if (isOptions && this.hasDelete)
                    buttons.push(Object.assign(this.BUTTON_DELETE, {
                        onClick: this.isEditable && !column.onDelete
                            ? this.onDeleteItem.bind(this)
                            : column.onDelete,
                    }));
                this.columns.push(Object.assign(new GridColumn(), column, {
                    items: column.items || [],
                    buttons: column.type != "options" ? undefined : column.buttons || buttons,
                }));
            }
        });
    }
    /**
     * Método chamado para incluir um item no grid.
     */
    onAddItem() {
        if (!this.adding) {
            this.adding = true; /* Previne multiplas chamadas para inserir */
            (async () => {
                this.form.reset(this.form.initialState);
                let newItem = this.add ? await this.add() : this.form.value;
                if (newItem) {
                    if (!(newItem["id"] || "").length && this.hasItems) {
                        newItem["id"] = this.dao
                            ? this.dao.generateUuid()
                            : this.util.md5();
                    }
                    this.items.push(newItem);
                    await this.edit(newItem);
                }
                else {
                    this.adding = false;
                }
            }).bind(this)();
        }
    }
    /**
     * Método chamado durante a edição ou inclusão de um item no grid.
     */
    onEditItem(row) {
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
    onDeleteItem(row) {
        (async () => {
            const remove = this.remove ? !!(await this.remove(row)) : this.hasItems;
            const index = remove
                ? this.items.findIndex((x) => x["id"] == row["id"])
                : -1;
            if (index >= 0)
                this.items.splice(index, 1);
            this.group(this.items);
            this.selected = undefined;
            this.cdRef.detectChanges();
        }).bind(this)();
    }
    onCancelItem() {
        (async () => {
            if (this.adding)
                this.items.splice(this.items.findIndex((x) => !(x instanceof GridGroupSeparator) &&
                    x["id"] == (this.editing || { id: undefined })["id"]), 1);
            await this.endEdit();
        }).bind(this)();
    }
    /**
     * Método chamado no salvamento de um item em um grid editável.
     * @param itemRow
     */
    onSaveItem(itemRow) {
        (async () => {
            await this.saveItem(itemRow);
        }).bind(this)();
    }
    /**
     * Método chamado pelo onSaveItem para o salvamento de um item de um grid editável.
     * @param itemRow
     */
    async saveItem(itemRow) {
        if (this.form.valid) {
            const entity = this.save
                ? (await this.save(this.form, itemRow))
                : this.form.value;
            if (entity) {
                const index = (this.items.indexOf(itemRow) + 1 ||
                    this.items.findIndex((x) => !(x["id"] || "").length || x["id"] == entity["id"]) + 1) - 1;
                let item = undefined;
                if (index >= 0) {
                    item = this.items[index];
                    Object.assign(this.items[index], this.util.fillForm(item, entity));
                }
                else if (entity["id"]?.length) {
                    item = entity;
                    this.items.push(entity);
                }
                this.editing = item;
                if (this.saveEnd)
                    this.saveEnd(item);
            }
            if (entity !== false) {
                this.group(this.items);
                this.control?.setValue(this.items);
                this.cdRef.detectChanges();
                await this.endEdit();
            }
        }
        else {
            this.form.markAllAsTouched();
        }
    }
    async edit(itemRow) {
        if (this.isSelectable && itemRow)
            this.onRowClick(new Event("SelectByEdit"), itemRow);
        this.editing = itemRow;
        if (this.filterRef)
            this.filterRef.visible = false;
        if (this.toolbarRef)
            this.toolbarRef.visible = false;
        if (this.load) {
            await this.load(this.form, itemRow);
        }
        else {
            this.form.patchValue(this.util.fillForm(this.form.value, itemRow));
        }
        this.cdRef.detectChanges();
        document.getElementById("row_" + itemRow.id)?.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" });
    }
    async endEdit() {
        const editedId = this.editing?.id;
        if (this.query && this.editing)
            await this.query.refreshId(this.editing.id);
        this.editing = undefined;
        this.adding = false;
        this.items = this.items;
        if (this.filterRef)
            this.filterRef.visible = true;
        if (this.toolbarRef)
            this.toolbarRef.visible = true;
        this.cdRef.detectChanges();
        if (this.isSelectable)
            this.onRowClick(new Event("SelectByEdit"), this.items.find((x) => x.id == editedId));
        if (this.editEnd)
            this.editEnd(editedId);
    }
    onRowClick(event, row) {
        if (this.isSelectable) {
            if (this.editing != row)
                this.onCancelItem();
            this.selected = row;
            this.cdRef.detectChanges();
            if (this.select)
                this.select.emit(row);
        }
    }
    selectById(id) {
        let row = this.items.find((x) => x.id == id);
        if (this.isSelectable && row)
            this.onRowClick(new Event("SelectById"), row);
        return row;
    }
    getMetadata(row) {
        if (row?.id) {
            if (!this.metadatas[row.id])
                this.metadatas[row.id] = {};
            return this.metadatas[row.id];
        }
        return {};
    }
    setMetadata(row, value) {
        if (row.id)
            this.metadatas[row.id] = value;
    }
    clearMetadata() {
        this.metadatas = {};
        this.cdRef.detectChanges();
    }
    /* Side panel ****************************************************************/
    get classColTable() {
        return ((this.sidePanel
            ? "col-md-" +
                (12 - this.sidePanel.size) +
                (this.sidePanel.isFullSizeOnEdit && this.editing ? " d-none" : "")
            : "col-md-12") + (this.isNoMargin ? " p-0 m-0" : ""));
    }
    get classColPanel() {
        return ("col-md-" +
            (this.sidePanel.isFullSizeOnEdit && this.editing
                ? 12
                : this.sidePanel.size));
    }
    /**************************************************************** Side panel */
    isInvalid() {
        return (!!this.control?.invalid && (this.control.dirty || this.control.touched));
    }
    hasError() {
        return !!this.control?.errors;
    }
    errorMessage() {
        return this.control.errors?.errorMessage;
    }
};
__decorate([
    HostBinding("class")
], GridComponent.prototype, "class", null);
__decorate([
    ContentChild(ColumnsComponent)
], GridComponent.prototype, "columnsRef", void 0);
__decorate([
    ContentChild(FilterComponent)
], GridComponent.prototype, "filterRef", void 0);
__decorate([
    ContentChild(SidePanelComponent)
], GridComponent.prototype, "sidePanel", void 0);
__decorate([
    ContentChild(ToolbarComponent)
], GridComponent.prototype, "toolbarRef", void 0);
__decorate([
    ContentChild(PaginationComponent)
], GridComponent.prototype, "paginationRef", void 0);
__decorate([
    ContentChild(HeaderGroupsComponent)
], GridComponent.prototype, "headerGroups", void 0);
__decorate([
    ViewChild(FormGroupDirective)
], GridComponent.prototype, "formDirective", void 0);
__decorate([
    Output()
], GridComponent.prototype, "select", void 0);
__decorate([
    Input()
], GridComponent.prototype, "dao", void 0);
__decorate([
    Input()
], GridComponent.prototype, "icon", void 0);
__decorate([
    Input()
], GridComponent.prototype, "selectable", void 0);
__decorate([
    Input()
], GridComponent.prototype, "loadList", void 0);
__decorate([
    Input()
], GridComponent.prototype, "multiselectChange", void 0);
__decorate([
    Input()
], GridComponent.prototype, "init", void 0);
__decorate([
    Input()
], GridComponent.prototype, "add", void 0);
__decorate([
    Input()
], GridComponent.prototype, "load", void 0);
__decorate([
    Input()
], GridComponent.prototype, "remove", void 0);
__decorate([
    Input()
], GridComponent.prototype, "save", void 0);
__decorate([
    Input()
], GridComponent.prototype, "editEnd", void 0);
__decorate([
    Input()
], GridComponent.prototype, "saveEnd", void 0);
__decorate([
    Input()
], GridComponent.prototype, "addRoute", void 0);
__decorate([
    Input()
], GridComponent.prototype, "addMetadata", void 0);
__decorate([
    Input()
], GridComponent.prototype, "labelAdd", void 0);
__decorate([
    Input()
], GridComponent.prototype, "orderBy", void 0);
__decorate([
    Input()
], GridComponent.prototype, "priorOrderBy", void 0);
__decorate([
    Input()
], GridComponent.prototype, "groupBy", void 0);
__decorate([
    Input()
], GridComponent.prototype, "join", void 0);
__decorate([
    Input()
], GridComponent.prototype, "leftJoin", void 0);
__decorate([
    Input()
], GridComponent.prototype, "fields", void 0);
__decorate([
    Input()
], GridComponent.prototype, "relatorios", void 0);
__decorate([
    Input()
], GridComponent.prototype, "form", void 0);
__decorate([
    Input()
], GridComponent.prototype, "noHeader", void 0);
__decorate([
    Input()
], GridComponent.prototype, "noMargin", void 0);
__decorate([
    Input()
], GridComponent.prototype, "editable", void 0);
__decorate([
    Input()
], GridComponent.prototype, "hasReport", void 0);
__decorate([
    Input()
], GridComponent.prototype, "scrollable", void 0);
__decorate([
    Input()
], GridComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], GridComponent.prototype, "control", void 0);
__decorate([
    Input()
], GridComponent.prototype, "expanded", void 0);
__decorate([
    Input()
], GridComponent.prototype, "noToggleable", void 0);
__decorate([
    Input()
], GridComponent.prototype, "minHeight", void 0);
__decorate([
    Input()
], GridComponent.prototype, "maxHeight", void 0);
__decorate([
    Input()
], GridComponent.prototype, "multiselect", void 0);
__decorate([
    Input()
], GridComponent.prototype, "multiselectEnabled", void 0);
__decorate([
    Input()
], GridComponent.prototype, "multiselectAllFields", void 0);
__decorate([
    Input()
], GridComponent.prototype, "canSelect", void 0);
__decorate([
    Input()
], GridComponent.prototype, "dynamicMultiselectMenu", void 0);
__decorate([
    Input()
], GridComponent.prototype, "multiselectMenu", void 0);
__decorate([
    Input()
], GridComponent.prototype, "groupTemplate", void 0);
__decorate([
    Input()
], GridComponent.prototype, "title", null);
__decorate([
    Input()
], GridComponent.prototype, "hasAdd", null);
__decorate([
    Input()
], GridComponent.prototype, "hasEdit", null);
__decorate([
    Input()
], GridComponent.prototype, "hasDelete", null);
__decorate([
    Input()
], GridComponent.prototype, "disabled", null);
__decorate([
    Input()
], GridComponent.prototype, "query", null);
__decorate([
    Input()
], GridComponent.prototype, "list", null);
__decorate([
    Input()
], GridComponent.prototype, "items", null);
__decorate([
    Input()
], GridComponent.prototype, "visible", null);
__decorate([
    Input()
], GridComponent.prototype, "loading", null);
__decorate([
    Input()
], GridComponent.prototype, "className", void 0);
GridComponent = __decorate([
    Component({
        selector: "grid",
        templateUrl: "./grid.component.html",
        styleUrls: ["./grid.component.scss"],
        providers: [
            {
                provide: FormGroupDirective,
                useFactory: (self) => {
                    return self.formDirective;
                },
                deps: [GridComponent],
            },
        ],
        standalone: false
    })
], GridComponent);
export { GridComponent };
//# sourceMappingURL=grid.component.js.map