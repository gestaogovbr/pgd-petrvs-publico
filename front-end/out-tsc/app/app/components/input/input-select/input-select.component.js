import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild, } from "@angular/core";
import { ControlContainer, FormControl, FormGroupDirective, } from "@angular/forms";
import { NavigateService } from "src/app/services/navigate.service";
import { InputBase } from "../input-base";
let InputSelectComponent = class InputSelectComponent extends InputBase {
    set where(value) {
        if (JSON.stringify(this._where) != JSON.stringify(value)) {
            this._where = value;
            this.loadItems();
        }
    }
    get where() {
        return this._where;
    }
    set itemTodos(value) {
        if (this.itemTodosButton.value != value)
            this.itemTodosButton.value = value;
    }
    get itemTodos() {
        return this.itemTodosButton.value;
    }
    set itemNull(value) {
        if (this.itemNullButton.value != value)
            this.itemNullButton.value = value;
    }
    get itemNull() {
        return this.itemNullButton.value;
    }
    set valueTodos(value) {
        if (this.itemTodosButton.key != value)
            this.itemTodosButton.key = value;
    }
    get valueTodos() {
        return this.itemTodosButton.key;
    }
    set items(value) {
        if (JSON.stringify(this._items) != JSON.stringify(value)) {
            this._items = value;
            this.setValue(this.currentValue);
            this.detectChanges();
        }
    }
    get items() {
        return this._items;
    }
    set control(value) {
        this._control = value;
    }
    get control() {
        return this.getControl();
    }
    set loading(value) {
        if (this._loading != value) {
            this._loading = value;
            this.detectChanges();
        }
    }
    get loading() {
        return this._loading;
    }
    set size(value) {
        this.setSize(value);
    }
    get size() {
        return this.getSize();
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.class = "form-group";
        this.change = new EventEmitter();
        this.details = new EventEmitter();
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.value = undefined;
        this.icon = "bi bi-menu-button-wide";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.fields = [];
        this.dao = undefined;
        this.listHeight = 200;
        this._items = [];
        this._loading = false;
        this._where = undefined;
        this.filterControl = new FormControl("");
        this.itemNullButton = {
            key: null,
            value: " - ",
        };
        this.itemTodosButton = {
            key: undefined,
            value: "",
        };
        this.itemDesconhecidoButton = {
            key: "UNKNOW",
            value: "",
        };
        this.go = injector.get(NavigateService);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => {
            if (this.dao)
                this.loadItems();
            if (this.control) {
                this.control.valueChanges.subscribe((newValue) => this.setValue(newValue));
                this.setValue(this.control.value);
            }
        });
    }
    get isFullEntity() {
        return this.fullEntity != undefined;
    }
    get isNullable() {
        return this.nullable != undefined;
    }
    get isTodos() {
        return !!this.itemTodos?.length;
    }
    get isNoIcon() {
        return this.noIcon != undefined;
    }
    get isNoColor() {
        return this.noColor != undefined;
    }
    get isLiveSearch() {
        return this.liveSearch != undefined;
    }
    get dropdownWidth() {
        return this.dropdownButton?.nativeElement.offsetWidth || 10;
    }
    isActive(item) {
        return item.key == this.current.value;
    }
    getStringId(value) {
        return this.util.onlyAlphanumeric(JSON.stringify(value));
    }
    get currentValue() {
        return this.control ? this.control.value : this.value;
    }
    get current() {
        if (this.isNullable && this.currentValue == null) {
            return this.itemNullButton;
        }
        else if (this.isTodos && this.currentValue == this.valueTodos) {
            return this.itemTodosButton;
        }
        else if (!this.selectedItem) {
            return this.itemDesconhecidoButton;
        }
        else {
            return this.selectedItem;
        }
    }
    get selectedItem() {
        return this.items.find((x) => x.key == this.currentValue);
    }
    onFilterChange() {
        this.cdRef.detectChanges();
    }
    itemVisible(item) {
        return ((!this.filterControl.value?.length ||
            new RegExp(this.filterControl.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i").test(item.value)) &&
            (!this.filter?.length || this.filter.includes(item.key)));
    }
    itemIndisponivel(item) {
        return (this.itemDisablePredicate ? this.itemDisablePredicate(item) : (item.data?.indisponivel || false));
    }
    getSelectItemValue(row) {
        return (this.fields.length
            ? this.fields
            : this.dao?.inputSearchConfig.searchFields || [])
            .map((f) => row[f])
            .join(" - ");
    }
    loadItems() {
        this.loading = true;
        this.detectChanges();
        if (this.isFullEntity) {
            this.dao
                ?.query({ where: this.where })
                .asPromise()
                .then((result) => {
                this.loading = false;
                this.items =
                    result.map((x) => {
                        return {
                            key: x.id,
                            value: this.getSelectItemValue(x),
                            data: x,
                        };
                    }) || [];
            });
        }
        else {
            this.dao
                ?.searchText("", this.fields.length ? this.fields : undefined, this.where, this.orderBy)
                .then((result) => {
                this.loading = false;
                this.items =
                    result.map((x) => {
                        return {
                            key: x.value,
                            value: x.text,
                        };
                    }) || [];
            });
        }
    }
    get isDetails() {
        return this.detailsButton !== undefined;
    }
    get isSearch() {
        return this.searchButton !== undefined;
    }
    setValue(value) {
        if ((this.control && this.control.value != value) || (!this.control && this.value != value)) {
            this.value = value;
            if (this.control)
                this.control.setValue(value);
            if (this.change)
                this.change.emit(new Event('change'));
        }
    }
    onDetailsClick(event) {
        if (this.details &&
            (this.isNullable || typeof this.currentValue != "undefined")) {
            const item = this.items.find((x) => x.key == this.currentValue);
            this.details.emit({
                value: item?.key,
                text: item?.value || "",
                entity: item?.data,
            });
        }
    }
    onItemClick(item) {
        if (this.itemIndisponivel(item))
            return;
        this.setValue(item.key);
    }
    onAddClick(event) {
        const modalRoute = this.addRoute;
        modalRoute.params = Object.assign(modalRoute.params || {}, { modal: true });
        this.go.navigate(this.addRoute, {
            modalClose: (result) => {
                if (result?.length) {
                    this.control?.setValue(result);
                    this.loadItems();
                }
            },
        });
    }
    onSearchClick(searchRoute) {
        const modalRoute = searchRoute;
        modalRoute.params = Object.assign(modalRoute?.params || {}, { modal: true });
        this.go.navigate(searchRoute, {
            metadata: { selectable: true },
            modalClose: (result) => {
                if (result && this.afterSearch)
                    this.afterSearch(result);
            },
        });
    }
};
__decorate([
    HostBinding("class")
], InputSelectComponent.prototype, "class", void 0);
__decorate([
    ViewChild("inputElement", { static: false })
], InputSelectComponent.prototype, "inputElement", void 0);
__decorate([
    ViewChild("dropdownButton", { static: false })
], InputSelectComponent.prototype, "dropdownButton", void 0);
__decorate([
    Output()
], InputSelectComponent.prototype, "change", void 0);
__decorate([
    Output()
], InputSelectComponent.prototype, "details", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "fields", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "fullEntity", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "dao", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "addRoute", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "searchRoute", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "afterSearch", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "nullable", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "noIcon", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "noColor", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "liveSearch", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "detailsButton", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "detailsButtonIcon", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "searchButton", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "searchButtonIcon", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "listHeight", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "prefix", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "sufix", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "filter", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "orderBy", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "itemDisablePredicate", void 0);
__decorate([
    Input()
], InputSelectComponent.prototype, "where", null);
__decorate([
    Input()
], InputSelectComponent.prototype, "itemTodos", null);
__decorate([
    Input()
], InputSelectComponent.prototype, "itemNull", null);
__decorate([
    Input()
], InputSelectComponent.prototype, "valueTodos", null);
__decorate([
    Input()
], InputSelectComponent.prototype, "items", null);
__decorate([
    Input()
], InputSelectComponent.prototype, "control", null);
__decorate([
    Input()
], InputSelectComponent.prototype, "loading", null);
__decorate([
    Input()
], InputSelectComponent.prototype, "size", null);
InputSelectComponent = __decorate([
    Component({
        selector: "input-select",
        templateUrl: "./input-select.component.html",
        styleUrls: ["./input-select.component.scss"],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective,
            },
        ],
        standalone: false
    })
], InputSelectComponent);
export { InputSelectComponent };
//# sourceMappingURL=input-select.component.js.map